const request = require('request-promise');

module.exports = {

    api(method, url, body = null) {
        return request
            ({
                method,
                url: 'https://discordapp.com/api/v6' + url,
                headers: {
                    Authorization: 'Bot ' + sails.config.felix.key
                },
                body,
                json: true
            });
    }

};
