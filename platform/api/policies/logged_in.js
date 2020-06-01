module.exports = (req, res, next) => {
    if (!req.local.user_id) return res.redirect('/');
    return next();
};
