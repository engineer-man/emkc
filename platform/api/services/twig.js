const moment = require('moment');

const twig = require('twig');

twig.extendFilter('noscript', value => {
    if (!value) {
        return value;
    }

    return value.replace(/\//gi, '\\/');
});

module.exports = {

    starts_with(string, path) {
        let pattern = new RegExp('^' + path.replace('/', '\\/'));

        return pattern.test(string);
    }

};
