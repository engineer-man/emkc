const request = require('request-promise');

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

    // For challenges
    async execute(language, source, args) {
        if (!Array.is_array(args)) args = [args];

        args = args.map(arg => '' + arg);

        // Limit api calls to 1 call each 1.5 seconds when using the public api
        timeout = constant.is_prod() ? 0 : 1500;
        var promise = new Promise(function(resolve, reject) {
            setTimeout(async () => {
                try {
                    let result = await request
                        ({
                            method: 'post',
                            url: constant.get_piston_url() + "/execute",
                            body: {
                                language,
                                source,
                                args
                            },
                            json: true,
                            simple: true
                        });

                    resolve(
                        typeof result.output === 'string'
                            ? result.output.slice(0, 1024)
                            : ''
                    );
                } catch(e) {
                    resolve('');
                }
            }, timeout);
        });
        return promise;
    }

};
