module.exports = async (req, res, next) => {
    req.local = req.local || { user_id: null };

    req.local.constant = constant;

    // get the logged in user
    let user = await db.users.find_one({
        where: {
            user_id: req.session?.user_id || null
        }
    });

    if (user) {
        req.local.user_id = user.user_id;
        req.local.user = user;
    }

    return next();
};
