const axios = require('axios');
const Redis = require('ioredis');

module.exports = {

    async runtimes(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', '*');

        if (req.method === 'OPTIONS') {
            return res
                .status(200)
                .send();
        }

        let result = await piston.runtimes();

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

        if (!sails.config.piston.unlimited_keys.includes(authorization)) {
            const redis = new Redis(6379, 'redis');

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

            redis.disconnect();
        }

        let { language, files, args, stdin, version } = req.body;

        try {
            let result = await piston
                .execute(
                    language,
                    files,
                    args,
                    stdin,
                    version,
                    {
                        server: 'Piston API',
                        user: 'Direct Usage'
                    }
                );

            return res
                .status(200)
                .send({
                    language: result.language,
                    version: result.version,
                    run: result.run,
                    compile: result.compile
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
                        message: 'Execution problem: ' + e.message
                    });
            }
        }
    }

};
