module.exports.http = {
    middleware: {
        xframe: require('lusca').xframe('SAMEORIGIN'),
        order: [
            'startRequestTimer',
            'xframe',
            'cookieParser',
            'session',
            'bodyParser',
            'test_json',
            'compress',
            'methodOverride',
            '$custom',
            'router',
            'www',
            'favicon',
            '404',
            '500'
        ],
        test_json(err, req, res, next) {
            if (err) {
                return res.send(400, {
                    message: 'Invalid JSON received'
                });
            }

            return next();
        }
    },

    bodyParser() {
        return require('skipper')({ limit: '4096mb' });
    }
};
