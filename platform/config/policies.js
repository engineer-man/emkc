module.exports.policies = {

    '*': 'common',

    'BoardController': {
        '*': ['common', 'user_auth']
    },

    'SnippetsController': {
        '*': ['common']
    },

    'QuestionsController': {
        '*': ['common', 'user_auth']
    }

};
