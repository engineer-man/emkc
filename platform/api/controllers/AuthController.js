const q = require('q');
const request = require('request-promise');

module.exports = {

    discord(req, res) {
        if (req.query.r) {
            req.session.redirect = req.query.r;
        } else {
            delete req.session.redirect;
        }

        return res.redirect(
            'https://discordapp.com/api/oauth2/authorize'+
            '?client_id=482732253835689994'+
            '&redirect_uri=' + encode_uri_component(constant.base_url + '/auth/discord_cb') +
            '&response_type=code'+
            '&scope=identify%20email'
        );
    },

    discord_cb(req, res) {
        var code = req.query.code;

        var discord_user;

        return request
            ({
                method: 'post',
                url: 'https://discordapp.com/api/v6/oauth2/token',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                form: {
                    code,
                    client_id: '482732253835689994',
                    client_secret: 'Q40OWJrxEy_kbKSdcfGz3rQxCtcuLOLY',
                    grant_type: 'authorization_code',
                    redirect_uri: constant.base_url + '/auth/discord_cb',
                    scope: 'identify email'
                },
                json: true,
                simple: true
            })
            .then(res => {
                return request
                    ({
                        method: 'get',
                        url: 'https://discordapp.com/api/v6/users/@me',
                        headers: {
                            Authorization: 'Bearer ' + res.access_token
                        },
                        json: true,
                        simple: true
                    });
            })
            .then(discord_user_data => { discord_user = discord_user_data;
                return db.users
                    .find_or_create({
                        where: {
                            discord_api: discord_user.id
                        },
                        defaults: {
                            display_name: discord_user.username,
                            email: discord_user.email || null
                        }
                    });
            })
            .spread(async (user, created) => {
                var username = discord_user.username;
                var ext = null;

                username = username.replace(/[^0-9A-Za-z_\-]+/gi, '');

                if (username === '') username = 'new_guy';

                if (created) {
                    // make sure username is unique
                    for (;;) {
                        var dupe = await db.users
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

                    user.username = username + (ext === null ? '' : ext);
                    await user.save();
                }

                // download image
                request
                    ({
                        method: 'get',
                        url: 'https://cdn.discordapp.com/avatars/' + discord_user.id + '/' + discord_user.avatar + '.png',
                        simple: true,
                        encoding: null
                    })
                    .then(res => {
                        gcloud
                            .stream_upload(res, 'avatars/' + user.user_id + '.png', false, true)
                            .then(() => {
                                user.avatar_url = '/avatars/' + user.user_id + '.png';
                                user.save();
                            });
                    })
                    .catch(err => {console.log(err)});

                req.session.user_id = user.user_id;

                discord
                    .api('put', '/guilds/473161189120147456/members/' + user.discord_api + '/roles/486562889046556682')
                    .catch(err => {});

                if (req.session.redirect) {
                    return res.redirect(req.session.redirect);
                    delete req.session.redirect;
                } else {
                    return res.redirect('/board');
                }
            })
            .catch(err => {
                return res.redirect('/');
            });
    },

    _config: {}

};
