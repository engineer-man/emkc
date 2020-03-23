module.exports = async (req, res, next) => {
    req.glob = req.glob || {};

    req.glob.constant = constant;

    // get the logged in user
    let user = await db.users
        .find_one({
            where: {
                user_id: req.session.user_id
            }
        });

    if (user) {
        req.glob.user_id = user.user_id;
        req.glob.user = user;
    }

    return next();
};
