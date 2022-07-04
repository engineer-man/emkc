const request = require('request-promise');

module.exports = {
    async api(method, url, body = null) {
        const options = {
            method,
            url: 'https://discord.com/api/v10' + url,
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

        const response = await request(options);

        return response;
    }
};
