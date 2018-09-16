module.exports = {

    create(req, res) {
        return db.code_rooms
            .create({
                user_id: req.glob.user_id || null
            })
            .then(room => {
                return res.redirect(room.url);
            });
    },

    view(req, res) {
        const { hash } = req.params;

        return db.code_rooms
            .find_one({
                where: {
                    hash
                }
            })
            .then(room => {
                if (!room) throw null;

                return res.view({
                    room,
                    code: room.code.split('\n')
                });
            })
            .catch(err => {
                return res.redirect('/coderooms');
            });
    },

    users(req, res) {
        const { hash } = req.params;

        code_rooms.redis.get('coderoom:' + hash, (err, data) => {
            data = data ? JSON.parse(data) : [];

            return res.send({
                status: 'ok',
                payload: {
                    users: data
                }
            });
        });
    },

    sync(req, res) {
        const { hash, session, delta } = req.body;

        sails.io.sockets.emit('coderoom_' + hash, { action: 'sync', hash, session, delta });

        return res.send();
    },

    save(req, res) {
        const { hash, code } = req.body;

        return db.code_rooms
            .find_one({
                where: {
                    hash
                }
            })
            .then(room => {
                if (!room) throw null;

                room.code = code;
                room.save();

                return res.send({
                    status: 'ok'
                });
            })
            .catch(err => {
                return res.send({
                    status: 'error'
                });
            });
    },

    _config: {}

};
