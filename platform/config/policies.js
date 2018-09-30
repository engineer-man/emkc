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
        '*': ['common'],
        'add_request': ['common', 'logged_in'],
        'video_request_vote': ['common', 'logged_in']
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
