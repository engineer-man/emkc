module.exports = function(req, res, next) {
    req.glob = req.glob || {};

    // get the logged in user
    return db.users
        .find_one({
            where: {
                user_id: req.session.user_id
            }
        })
        .then(user => {
            if (user) {
                req.glob.user_id = user.user_id;
                req.glob.user = user;
            }

            return next();
        });
};
