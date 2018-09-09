module.exports.session = {

    adapter: 'redis',
    key: 'engineerman.sid',
    cookie: {
        maxAge: 60 * 60 * 24 * 20 * 1000
    }

};
