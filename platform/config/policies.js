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

    'CommunityController': {
        '*': ['common']
    },

    'CodeRoomsController': {
        '*': ['common']
    },

    'ProfilesController': {
        '*': ['common']
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
