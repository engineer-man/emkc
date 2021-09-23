const moment = require('moment');

let constant = {

    no: 0,
    yes: 1,

    awards: {
        type: {
            contest_first_overall: 1,
            contest_second_overall: 2,
            contest_third_overall: 3,
            contest_first_language: 4,
            general_participation: 5
        },
        ref_type: {
            contests: 1
        }
    },

    challenges: {
        supported_languages: [
            'js',
            'python',
            'go',
            'c',
            'ruby',
            'cpp',
            'cs',
            'php',
            'swift',
            'java',
            'rust',
            'julia',
            'bash',
            'perl',
            'kotlin',
            'haskell',
            'nim'
        ],
        difficulty: {
            easy: 1,
            medium: 2,
            hard: 3
        }
    },

    contests: {
        disallowed_languages: [
            'python2',
            'awk'
        ],
        golf_languages: [
            'jelly',
            'osabie'
        ]
    },

    channels: {
        emkc: '483979558249562112',
        python: '483980259239264256', // python
        js: '483977935225749504', // js-ts-node
        go: '484027805605298197', // other-languages
        c: '483978202092535809', // c-cpp-csharp
        ruby: '484027805605298197', // other-languages
        cpp: '483978202092535809', // c-cpp-csharp
        cs: '483978202092535809', // c-cpp-csharp
        php: '484027805605298197', // other-languages
        swift: '484027805605298197', // other-languages
        java: '483979599131312128' // java-kotlin
    },

    roles: {
        emkc_member: '486562889046556682',
        emkc_novice: '489975146782785536',
        emkc_hero: '489975618016903180',
        emkc_master: '489975728822288384',
        emkc_legend: '490314890779688963',
        emkc_winner: '490324386675425281'
    },

    server_id: '473161189120147456',

    set_dynamic() {
        this.base_url = sails.config.base_url;
        this.cdn_url = this.base_url + '/cdn';
    },

    is_prod() {
        return sails.config.environment === 'production';
    },

    get_piston_url() {
        // Use the public api if the public API if the environment is development
        // or the local host if the environment is production
        let url = sails.config.environment === 'production'
            ? 'http://' + sails.config.piston.host + '/api/v2'
            : 'https://emkc.org/api/v2/piston'
        return url;
    }

};

constant.set_dynamic();

module.exports = constant;
