const axios = require('axios');

module.exports = {

    async execute(req, res) {
        const { language, source } = req.body;

        try {
            let result = await axios
                ({
                    method: 'post',
                    url: 'http://' + sails.config.piston.host + '/execute',
                    data: {
                        language,
                        source
                    }
                });

            if (result.status >= 300) {
                throw new Error('Execution problem');
            }

            return res
                .status(200)
                .send({
                    ran: result.data.ran,
                    output: result.data.output
                        ? result.data.output
                            .replace(/\r/gi, '')
                            .slice(0, 1024)
                        : ''
                });
        } catch (e) {
            return res
                .status(500)
                .send({
                    message: e.message
                });
        }
    }

};
