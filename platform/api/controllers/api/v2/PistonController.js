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
                        message: 'Requests limited to 1 per 200ms'
                    });
            } else {
                await redis.set(`piston-${req.ip}`, 0, 'px', 200);
            }

            redis.disconnect();
        }

        let { language, files, args, stdin, version, run_timeout, compile_timeout } = req.body;

        let log = null;

        if (req.body.log !== 0) {
            log = {
                server: 'Piston API',
                user: 'Direct Usage'
            };
        }

        try {
            let result = await piston
                .execute(
                    language,
                    files,
                    args,
                    stdin,
                    version,
                    log,
                    {
                        run: run_timeout,
                        compile: compile_timeout
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
