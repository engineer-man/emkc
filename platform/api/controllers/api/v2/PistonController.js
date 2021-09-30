const moment = require('moment')
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
        let rate_limit_reset = '0';
        let rate_limit_remaining = 'Infinity';
        let rate_limit_limit = 'Infinity'

        if (!sails.config.piston.unlimited_keys.includes(authorization)) {
            const redis = new Redis(6379, 'redis');
            const time_limit = 200;
            rate_limit_remaining = '0';
            rate_limit_limit = '1';

            let entry = await redis.get(`piston-${req.ip}`);

            if (entry) {
                redis.disconnect();

                return res
                    .status(429)
                    .set({
                        'x-ratelimit-limit': rate_limit_limit,
                        'x-ratelimit-reset': entry,
                        'x-ratelimit-remaining': rate_limit_remaining
                    })
                    .send({
                        message: `Requests limited to 1 per ${time_limit} ms`
                    });
            } else {
                rate_limit_reset = (moment().value_of() + time_limit).to_string();
                await redis.set(`piston-${req.ip}`, rate_limit_reset, 'px', time_limit);
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

        let headers = {
            'x-ratelimit-limit': rate_limit_limit,
            'x-ratelimit-reset': rate_limit_reset,
            'x-ratelimit-remaining': rate_limit_remaining
        };

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
                .set(headers)
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
                    .set(headers)
                    .send({
                        message: e.message
                    });
            } else {
                return res
                    .status(500)
                    .set(headers)
                    .send({
                        message: 'Execution problem: ' + e.message
                    });
            }
        }
    }

};
