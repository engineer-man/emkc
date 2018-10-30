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
        'add_video_request': ['common', 'logged_in'],
        'delete_video_request': ['common', 'logged_in'],
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
    },

    'api/internal/ChatsController': {
        '*': ['common', 'api_internal_auth']
    },

    'api/internal/PistonController': {
        '*': ['common', 'api_internal_auth']
    },

    'api/v1/stats/DiscordController': {
        '*': ['common']
    }

};
