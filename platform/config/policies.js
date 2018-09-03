module.exports.policies = {

    '*': 'common',

    'AuthController': {
        '*': ['common']
    },

    'BoardController': {
        '*': ['common']
    },

    'CommentsController': {
        '*': ['common', 'logged_in']
    },

    'QuestionsController': {
        '*': ['common'],
        'ask': ['common', 'logged_in'],
        'edit': ['common', 'logged_in']
    },

    'SnippetsController': {
        '*': ['common']
    },

    'VotesController': {
        '*': ['common', 'logged_in']
    }

};
