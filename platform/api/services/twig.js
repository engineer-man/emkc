const moment = require('moment');

module.exports = {

    starts_with(string, path) {
        var pattern = new RegExp('^' + string.replace('/', '\\/'));

        return pattern.test(path);
    }

};
