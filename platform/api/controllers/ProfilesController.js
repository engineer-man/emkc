module.exports = {

    view(req, res) {
        const username = req.params.username;

        return db.users
            .find_one({
                where: {
                    username
                }
            })
            .then(user => {
                if (!user) throw null;

                return res.view({
                    user:user
                });
            })
            .catch(err => {
                return res.redirect('/');
            });
    },

    _config: {}

};
