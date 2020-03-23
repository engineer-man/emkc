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

    async execute(language, source, args) {
        if (!Array.is_array(args)) args = [args];

        args = args.map(arg => '' + arg);

        try {
            let result = await request
                ({
                    method: 'post',
                    url: 'http://' + sails.config.piston.host + '/execute',
                    body: {
                        language,
                        source,
                        args
                    },
                    json: true,
                    simple: true
                });

            return typeof result.output === 'string'
                ? result.output.slice(0, 1024)
                : '';
        } catch(e) {
            return '';
        }
    }

};
