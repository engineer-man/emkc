const moment = require('moment');
const q = require('q');

module.exports = {

    not_found(req, res) {
        res.status(404);

        return res.send({
            message: 'API endpoint not found'
        });
    },

    _config: {}

};
