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


        let result = await piston.runtimes();

        result = result.map(lang => {
            return {
                name: lang.language,
                version: lang.version,
                aliases: lang.aliases
            };
        });

        return res
            .status(200)
            .send(result);
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

        let { language, source, args, stdin, version } = req.body;

        try {
            let result = await piston
                .execute(
                    language,
                    source,
                    args,
                    stdin,
                    version || '*', //default to latest version
                    {
                        server: 'Piston API',
                        user: 'Direct Usage'
                    }
                );

            return res
                .status(200)
                .send({
                    ran: result.ran,
                    language: result.language,
                    version: result.version,
                    output: result.output
                        ? result.output
                            .replace(/\r/gi, '')
                            .slice(0, 65536)
                        : '',
                    stdout: result.stdout
                        ? result.stdout
                            .replace(/\r/gi, '')
                            .slice(0, 65536)
                        : '',
                    stderr: result.stderr
                        ? result.stderr
                            .replace(/\r/gi, '')
                            .slice(0, 65536)
                        : ''
                });

        } catch(e) {
            if (e.status_code === 400) {
                return res
                    .status(400)
                    .send({
                        message: e.message
                    });
            } else {
                return res
                    .status(500)
                    .send({
                        message: 'Execution problem'
                    });
            }
        }
    }

};
