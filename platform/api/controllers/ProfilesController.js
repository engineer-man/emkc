module.exports = {

    view(req, res) {
        const username = req.params.username;

        return Promise.resolve(null)
            .then(() => {

                return [
                    db.users
                        .find_one({
                            where: {
                                username
                            }
                        }),
                    db.questions
                        .find_all({
                            where: {
                                user_id: req.glob.user_id
                            },
                            order: [
                                ['created_at', 'desc']
                            ],
                            limit: 5
                        }),
                    db.comments
                        .find_all({
                            where: {
                                user_id: req.glob.user_id
                            },
                            order: [
                                ['created_at', 'desc']
                            ],
                            limit: 5
                        })
                    ];
            })
            .spread((user, questions, comments) => {
                return res.view({
                    user,
                    questions,
                    comments
                });
            })
            .catch(err => {
                return res.redirect('/');
            });
    },

    _config: {}

};
