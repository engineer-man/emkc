module.exports = function(req, res, next) {
    req.glob = req.glob || {};

    sails.glob.constant = constant;

    if (!sails.glob.epoch)
        sails.glob.epoch = +new Date();

    return next();
};
