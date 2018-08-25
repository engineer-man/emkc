const moment = require('moment');

var constant = {

    no: 0,
    yes: 1,

    devprod() {
        if (this.is_prod()) {
            this.gcloud = 'engineerman';
        } else {
            this.gcloud = 'engineerman-dev';
        }

        this.base_url = sails.config.base_url;
        this.gcloud_base_url = 'https://storage.googleapis.com/' + this.gcloud;
    },

    is_prod() {
        return sails.config.environment === 'production';
    }

};

constant.devprod();

module.exports = constant;
