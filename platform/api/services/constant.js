const moment = require('moment');

var constant = {

    no: 0,
    yes: 1,

    challenges: {
        supported_languages: ['js', 'python', 'go', 'c', 'ruby', 'cpp', 'cs', 'php', 'swift', 'java'],
        difficulty: {
            easy: 1,
            medium: 2,
            hard: 3
        }
    },

    notifications: {
        type: {
            new_comment: 1
        },
        entity_type: {
            comments: 1
        }
    },

    roles: {
        emkc_member: '486562889046556682',
        emkc_novice: '489975146782785536',
        emkc_hero: '489975618016903180',
        emkc_master: '489975728822288384',
        emkc_legend: '490314890779688963',
        emkc_winner: '490324386675425281'
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
