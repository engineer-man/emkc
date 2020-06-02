module.exports = {

    async home(req, res) {
        let users = await db.users
            .find_all({
                order: [
                    ['score', 'desc'],
                    ['user_id']
                ],
                limit: 100
            });

        return res.view({
            users
        });
    },

    privacy(req, res) {
        return res.view();
    },

    login() {
        return res.view();
    },

    logout(req, res) {
        delete req.session.user_id;
        return res.redirect('back');
    },

    fourohfour(req, res) {
        return res
            .status(404)
            .view('home/fourohfour');
    }

};
