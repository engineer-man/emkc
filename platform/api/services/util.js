const fs = require('fs');
const moment = require('moment');

module.exports = {

    now() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },

    bury_upload(file) {
        if (!file) return null;

        file
            .upload({dirname: '/tmp'}, (err, files) => {
                files.for_each(file => {
                    fs.unlink(file.fd);
                });
            });
    }

};
