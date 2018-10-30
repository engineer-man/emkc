module.exports = function(req, res, next) {
    var authorization;

    Object.keys(req.headers)
        .for_each(key => {
            if (key.to_lower_case() === 'authorization') authorization = req.headers[key];
        });

    if (authorization !== sails.config.api.internal_key) {
        return res.send(401, {
            message: 'Invalid authorization'
        });
    }

    return next();
};
