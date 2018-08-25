module.exports = function(req, res, next) {
    if (!req.session.user_id) return res.redirect('/');

    // get the logged in user
    return db.users
        .find_one({
            where: {
                user_id: req.session.user_id
            }
        })
        .then(user => {
            if (!user) return res.redirect('/');

            req.glob.user_id = user.user_id;
            req.glob.user = user;

            return next();
        });
};
