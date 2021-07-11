module.exports = (req, res, next) => {
    if (!constant.is_prod()) {
        return res.redirect('/');
    }

    return next();
};
