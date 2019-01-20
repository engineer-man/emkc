module.exports = {

    home(req, res) {
        return Promise.resolve(null)
            .then(() => {
                return [
                    db.users
                        .find_all({
                            where: {
                                //is_staff: {
                                //    $ne: 1
                                //}
                            },
                            order: [
                                ['score', 'desc'],
                                ['user_id']
                            ],
                            limit: 25
                        })
                ];
            })
            .spread((users) => {
                return res.view({
                    users
                });
            });
    },

    _config: {}

};
