module.exports = {

    handle(req, res) {
        var {type, pk} = req.params;
        var value = req.body.value;

        return db[type + '_votes']
            .find_one({
                where: {
                    [type + '_id']: pk,
                    user_id: req.glob.user_id
                }
            })
            .then(vote => {
                if (vote) return vote.destroy();
                return null;
            })
            .then(() => {
                if (!value || typeof value !== 'number') return null;

                value = value < -1 ? -1 : value;
                value = value > 1 ? 1 : value;

                return db[type + '_votes']
                    .create({
                        [type + '_id']: pk,
                        user_id: req.glob.user_id,
                        value
                    });
            })
            .then(() => {
                return res.send({
                    status: 'ok'
                });
            })
            .catch(err => {
                return res.send({
                    status: 'error',
                    payload: {
                        message: 'There was a problem recording your vote'
                    }
                });
            });
    },

    _config: {}

};
