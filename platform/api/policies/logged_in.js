module.exports = (req, res, next) => {
    if (!req.glob.user_id) return res.redirect('/');
    return next();
};
