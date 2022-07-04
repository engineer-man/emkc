module.exports = {
    async view_all(req, res) {
        let users = await db.users.find_all({
            attributes: ['user_id', 'username', 'display_name', 'created_at'],
            where: {
                [$not]: {
                    user_id: req.session.user_id
                }
            },
            order: [['user_id', 'desc']]
        });

        return res.view({
            users
        });
    },

    async login_as(req, res) {
        let target_id = parse_int(req.query.user_id);

        let user = await db.users.find_one({
            where: {
                user_id: target_id
            }
        });

        // The logging in logic
        if (req.session.user_id === target_id || req.session.old_id || !user) {
            // On trying to log in as oneself or not using the original user
            return res.view('home/fourohfour');
        }

        req.session.old_id = req.session.user_id;
        req.session.user_id = target_id;

        return res.redirect('/');
    }
};
