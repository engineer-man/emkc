module.exports.policies = {

    '*': 'common',

    'BoardController': {
        '*': ['common', 'user_auth']
    },

    'CommentsController': {
        '*': ['common', 'user_auth']
    },

    'QuestionsController': {
        '*': ['common', 'user_auth']
    },

    'SnippetsController': {
        '*': ['common']
    },

    'VotesController': {
        '*': ['common', 'user_auth']
    }

};
