module.exports.policies = {

    '*': 'common',

    'BoardController': {
        '*': ['common', 'user_auth']
    }

};
