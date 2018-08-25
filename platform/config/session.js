module.exports.session = {

    secret: '0b1234525a7d98578555fa0af66a6311',
    adapter: 'redis',
    key: 'engineerman.sid',
    cookie: {
        maxAge: 60 * 60 * 24 * 20 * 1000
    }

};
