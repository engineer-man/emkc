module.exports.policies = {

    '*': 'common',

    'BoardController': {
        '*': ['common', 'user_auth']
    },

    'QuestionsController': {
        '*': ['common', 'user_auth']
    }

};
