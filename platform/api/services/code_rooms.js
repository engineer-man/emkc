const config = require(root_dir + '/platform/config/local.js');

module.exports = {

    redis: require('redis').createClient({host: config.session.host}),

    handle_socket_actions(socket, hash) {
        const vars = socket.handshake.headers.cookie
            ? socket.handshake.headers.cookie.split(';')
            : null;

        if (!vars) return null;

        var headers = {};

        for (var i = 0; i < vars.length; ++i) {
            var pair = vars[i].split('=');

            headers[pair[0].trim()] = decode_uri_component(pair[1].trim());
        }

        var redis_id = headers['engineerman.sid'].replace('s:', 'sess:').split('.')[0];

        var user;

        this.redis.get(redis_id, (err, data) => {
            data = JSON.parse(data);

            if (!data || !data.user_id) return;

            return db.users
                .find_one({
                    where: {
                        user_id: data.user_id
                    }
                })
                .then(user_data => { user = user_data;
                    this.redis.get('coderoom:' + hash, (err, data) => {
                        data = data ? JSON.parse(data) : [];

                        data.push({
                            socket_id: socket.id,
                            user_id: user.user_id,
                            display_name: user.display_name,
                            avatar_url: constant.cdn_url + user.avatar_url
                        });

                        var final_data = [];

                        data.for_each(data => {
                            if (final_data.some(d => d.socket_id === data.socket_id)) return null;
                            final_data.push(data);
                        });

                        this.redis.set('coderoom:' + hash, JSON.stringify(final_data));
                    });

                    sails.io.sockets.emit('coderoom_' + hash, {
                        action: 'join',
                        user_id: user.user_id,
                        display_name: user.display_name,
                        avatar_url: constant.cdn_url + user.avatar_url
                    });
                });
        });

        socket.on('disconnect', () => {
            if (!user) return null;

            this.redis.get('coderoom:' + hash, (err, data) => {
                data = data ? JSON.parse(data) : [];

                data = data.filter(d => d.socket_id !== socket.id);

                this.redis.set('coderoom:' + hash, JSON.stringify(data));
            });

            sails.io.sockets.emit('coderoom_' + hash, {
                action: 'leave',
                user_id: user ? user.user_id : socket.id
            });
        });
    }

};
