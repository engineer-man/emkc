const request = require('request-promise');

module.exports = {

    async api(method, url, body = null) {
        try {
            return await request
                ({
                    method,
                    url: 'https://discordapp.com/api/v6' + url,
                    headers: {
                        Authorization: 'Bot ' + sails.config.felix.key
                    },
                    body,
                    json: true,
                    simple: false,
                    resolveWithFullResponse: true
                });
        } catch(e) {
            // no need
        }
    }

};
