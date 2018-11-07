const request = require('request-promise');

module.exports = {

    execute(req, res) {
        const {language, source} = req.body;

        return request
            ({
                method: 'post',
                url: 'http://' + sails.config.piston.host + '/execute',
                body: {
                    language,
                    source
                },
                json: true,
                simple: true
            })
            .then(result => {
                return res.send({
                    status: 'ok',
                    payload: {
                        ran: result.ran,
                        output: result.output
                            ? result.output
                                .replace(/\r/gi, '')
                                .slice(0, 1024)
                            : ''
                    }
                });
            })
            .catch(err => {
                return res.send({
                    status: 'error',
                    payload: {
                        message: 'Execution problem'
                    }
                });
            });
    },

    _config: {}

};
