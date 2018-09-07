const moment = require('moment');

var constant = {

    no: 0,
    yes: 1,

    notifications: {
        type: {
            new_comment: 1
        },
        entity_type: {
            comments: 1
        }
    },

    devprod() {
        if (this.is_prod()) {
            this.gcloud_bucket = 'engineerman';
        } else {
            this.gcloud_bucket = 'engineerman-dev';
        }

        this.base_url = sails.config.base_url;
        this.gcloud_base_url = 'https://storage.googleapis.com/' + this.gcloud_bucket;
    },

    is_prod() {
        return sails.config.environment === 'production';
    }

};

constant.devprod();

module.exports = constant;
