const request = require('request-promise');

module.exports = {

    async api(method, url, body = null) {
        const options = {
            method,
            url: 'https://discordapp.com/api/v6' + url,
            headers: {
                Authorization: 'Bot ' + sails.config.felix.key
            },
            json: true,
            simple: false,
            resolveWithFullResponse: true
        };

        if (body) {
            options.body = body;
        }

        return await request(options);
    }

};
