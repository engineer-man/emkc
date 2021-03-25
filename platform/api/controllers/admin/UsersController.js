module.exports = {
    async login_as(req, res) {
        let target_id = parse_int(req.query.user_id);
        // The search page
        if (!target_id) {
            let users = await db.users.find_all({
                where: {
                    [$not]: { user_id: req.session.user_id }
                }
            });
            return res.view({ users });
        }
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
        return res.redirect('/')
    }
}
