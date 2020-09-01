module.exports = (req, res, next) => {
    if (!req.local.user || !req.local.user.is_staff) {
        return res.redirect('/');
    }

    return next();
};
