const axios = require('axios');
const Redis = require('ioredis');

module.exports = {

    async versions(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', '*');

        if (req.method === 'OPTIONS') {
            return res
                .status(200)
                .send();
        }

        let result = await axios
            ({
                method: 'get',
                url: constant.get_piston_url() + '/versions'
            });

        return res
            .status(200)
            .send(result.data);
    },

    async execute(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', '*');

        if (req.method === 'OPTIONS') {
            return res
                .status(200)
                .send();
        }

        const ip = req.headers['x-real-ip'];
        const authorization = req.headers['authorization'];
        const redis = new Redis(6379, 'redis');

        if (authorization !== sails.config.api.internal_key) {
            let entry = await redis.get(`piston-${req.ip}`);

            if (entry) {
                return res
                    .status(429)
                    .send({
                        message: 'Requests limited to 5 per second'
                    });
            } else {
                await redis.set(`piston-${req.ip}`, 0, 'px', 200);
            }
        }

        redis.disconnect();

        let { language, source, args } = req.body;

        if (!Array.is_array(args)) {
            args = [];
        }

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

        if (result.status === 400) {
            return res
                .status(400)
                .send({
                    message: 'Unsupported language supplied'
                });
        }

        if (result.status >= 300) {
            return res
                .status(500)
                .send({
                    message: 'Execution problem'
                });
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
    }

};
