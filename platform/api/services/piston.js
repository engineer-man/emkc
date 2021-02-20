const request = require('request-promise');

const timeout = ms => new Promise(res => set_timeout(res, ms));

module.exports = {

    languages: {
        python: 'python',
        javascript: 'javascript',
        ruby: 'ruby',
        go: 'go',
        c: 'c',
        cpp: 'cpp',
        csharp: 'csharp',
        php: 'php',
        swift: 'swift',
        java: 'java'
    },

    async execute(language, source, args) {
        if (!Array.is_array(args)) {
            args = [args];
        }

        args = args.map(arg => '' + arg);

        try {
            await timeout(constant.is_prod() ? 0 : 500);  // Delay by 0.5 seconds when using the public api

            let result = await request
                ({
                    method: 'post',
                    url: constant.is_prod()
                        ? 'http://' + sails.config.piston.host + '/execute'
                        : 'https://emkc.org/api/v1/piston/execute',
                    body: {
                        language,
                        source,
                        args
                    },
                    json: true,
                    simple: true
                });

            // send to piston logs for stats
            db.piston_runs
                .create({
                    server: 'EMKC',
                    user: 'EMKC Usage',
                    language,
                    source
                });

            return typeof result.output === 'string'
                ? result.output.slice(0, 1024)
                : '';
        } catch(e) {
            return '';
        }
    }

};
