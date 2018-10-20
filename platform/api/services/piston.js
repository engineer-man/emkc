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

    execute(language, source, args) {
        if (!Array.is_array(args)) args = [args];

        return request
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
            })
            .then(result => {
                return typeof result.output === 'string'
                    ? result.output.slice(0, 1024)
                    : '';
            })
            .catch(err => {
                return '';
            });
    }

};
