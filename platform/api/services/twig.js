const moment = require('moment');

require('twig')
    .extendFilter('noscript', value => {
        if (!value) return value;
        return value.replace(/\//gi, '\\/');
    });

module.exports = {

    starts_with(string, path) {
        var pattern = new RegExp('^' + string.replace('/', '\\/'));

        return pattern.test(path);
    }

};
