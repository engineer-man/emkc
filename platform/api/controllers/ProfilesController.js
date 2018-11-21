module.exports = {

    view(req, res) {
        const username = req.params.username;

        return db.users
            .find_one({
                where: {
                    username
                },
                include: [
                    {
                        model: db.questions,
                        as: 'questions'
                    }
                ]
            })
            .then(user => {
                if (!user) throw null;

                return res.view({
                    user
                });
            })
            .catch(err => {
                return res.redirect('/');
            });
    },

    _config: {}

};
