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

    async log_back(req, res) {
        if (!req.session.old_id) {
            // Logging back from nothing
            return res.view('home/fourohfour');
        }
        req.session.user_id = req.session.old_id;
        delete req.session.old_id;
        return res.redirect('/');
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
