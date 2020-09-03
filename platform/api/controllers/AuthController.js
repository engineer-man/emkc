const fs = require('fs');
const request = require('request-promise');

module.exports = {

    discord(req, res) {
        // handle the redirect if one was passed with the login operation
        if (req.query.r) {
            req.session.redirect = req.query.r;
        } else {
            delete req.session.redirect;
        }

        return res.redirect(
            'https://discordapp.com/api/oauth2/authorize'+
            '?client_id=' + sails.config.discord.client_id +
            '&redirect_uri=' + encode_uri_component(constant.base_url + '/auth/discord_cb') +
            '&response_type=code'+
            '&scope=identify%20email'
        );
    },

    async discord_cb(req, res) {
        let code = req.query.code;

        let discord_user;

        try {
            // get an access token from the code returned from the authorization phase
            let auth_result = await request
                ({
                    method: 'post',
                    url: 'https://discordapp.com/api/v6/oauth2/token',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    form: {
                        code,
                        client_id: sails.config.discord.client_id,
                        client_secret: sails.config.discord.client_secret,
                        grant_type: 'authorization_code',
                        redirect_uri: constant.base_url + '/auth/discord_cb',
                        scope: 'identify email'
                    },
                    json: true,
                    simple: true
                });

            // use the returned token to get the data of the user who just logged in
            let discord_user = await request
                ({
                    method: 'get',
                    url: 'https://discordapp.com/api/v6/users/@me',
                    headers: {
                        Authorization: 'Bearer ' + auth_result.access_token
                    },
                    json: true,
                    simple: true
                });

            // add a new user record if there is not already one matching the given api id
            let [user, created] = await db.users
                .find_or_create({
                    where: {
                        discord_api: discord_user.id
                    },
                    defaults: {
                        display_name: discord_user.username,
                        email: discord_user.email || null
                    }
                });

            // if this is a new account, sort out what they're username should be
            // usernames must be letter, numbers, underscores, and dashes only
            // default username is new_guy and then a number which increases until one isn't used
            if (created) {
                let username = discord_user.username;
                let ext = null;

                username = username.replace(/[^0-9A-Za-z_\-]+/gi, '');

                if (username === '') username = 'new_guy';

                // make sure username is unique
                for (;;) {
                    let dupe = await db.users
                        .find_one({
                            where: {
                                user_id: {
                                    $ne: user.user_id
                                },
                                username: username + (ext === null ? '' : ext)
                            }
                        });

                    if (!dupe) break;

                    ext = ext === null ? 0 : ++ext;
                }

                // save the new username
                user.username = username + (ext === null ? '' : ext);
                await user.save();
            }

            // download discord avatar
            request
                ({
                    method: 'get',
                    url: 'https://cdn.discordapp.com/avatars/' + discord_user.id + '/' + discord_user.avatar + '.png',
                    simple: true,
                    encoding: null
                })
                .then(res => {
                    fs.write_file(root_dir + '/cdn/avatars/' + user.user_id + '.png', res, () => {});

                    user.avatar_url = '/avatars/' + user.user_id + '.png';
                    user.save();
                })
                .catch(err => {});

            // this logs the user in basically
            req.session.user_id = user.user_id;

            // add the emkc member role on discord
            discord
                .api('put', `/guilds/473161189120147456/members/${user.discord_api}/roles/${constant.roles.emkc_member}`);

            // according to whether or not the redirect was supplied, either go to that url or to board main
            if (req.session.redirect) {
                return res.redirect(req.session.redirect);
                delete req.session.redirect;
            } else {
                return res.redirect('/board');
            }
        } catch (e) {
            return res.redirect('/');
        }
    }

};
