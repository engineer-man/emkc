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
                redis.disconnect();

                return res
                    .status(429)
                    .send({
                        message: 'Requests limited to 2 per second'
                    });
            } else {
                await redis.set(`piston-${req.ip}`, 0, 'px', 500);
            }
        }

        redis.disconnect();

        let { language, source, args, stdin } = req.body;

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
                    args,
                    stdin
                }
            });

        if (result.status === 400) {
            return res
                .status(400)
                .send({
                    message: result.data.message
                });
        }

        if (result.status >= 300) {
            return res
                .status(500)
                .send({
                    message: 'Execution problem'
                });
        }

        if (req.body.log !== 0) {
            // logging for piston api direct usage
            db.piston_runs
                .create({
                    server: 'Piston API',
                    user: 'Direct Usage',
                    language,
                    source
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
                    : '',
                stdout: result.data.stdout
                    ? result.data.stdout
                        .replace(/\r/gi, '')
                        .slice(0, 65536)
                    : '',
                stderr: result.data.stderr
                    ? result.data.stderr
                        .replace(/\r/gi, '')
                        .slice(0, 65536)
                    : ''
            });
    }

};
