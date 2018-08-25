const moment = require('moment');

module.exports = {

    log(err, msg) {
        var final_message =
            '[msg] ' + msg + '\n' +
            '[date] ' + util.now();

        if (err) {
            final_message += '\n[err] ' + err.toString();
        }

        console.log('\n---\n' + final_message);
    }

};