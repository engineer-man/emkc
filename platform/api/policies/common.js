module.exports = function(req, res, next) {
    req.glob = req.glob || {};

    return next();
};
