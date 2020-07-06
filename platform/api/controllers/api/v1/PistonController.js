const axios = require('axios');
const Redis = require('ioredis');

module.exports = {

    async versions(req, res) {
        let result = await axios
            ({
                method: 'get',
                url: 'http://' + sails.config.piston.host + '/versions'
            });

        return res
            .status(200)
            .send(result.data);
    },

    async execute(req, res) {
        const ip = req.headers['x-real-ip'];console.log(ip);
        const redis = new Redis(6379, 'redis');

        let entry = await redis.get(`piston-${req.ip}`);

        if (entry) {
            return res
                .status(429)
                .send({
                    message: 'Requests limited to 1 per second'
                });
        } else {
            await redis.set(`piston-${req.ip}`, 0, 'ex', 1);
        }

        let { language, source, args } = req.body;

        if (!Array.is_array(args)) {
            args = [];
        }

        try {
            let result = await axios
                ({
                    method: 'post',
                    url: 'http://' + sails.config.piston.host + '/execute',
                    data: {
                        language,
                        source,
                        args
                    }
                });

            if (result.status >= 300) {
                throw new Error('Execution problem');
            }

            return res
                .status(200)
                .send({
                    ran: result.data.ran,
                    language: result.data.language,
                    version: result.data.version,
                    output: result.data.output
                        ? result.data.output
                            .replace(/\r/gi, '')
                            .slice(0, 65536)
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
