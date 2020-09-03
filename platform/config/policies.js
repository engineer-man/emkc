module.exports.policies = {

    '*': 'common',

    'CommunityController': {
        '*': ['common'],
        'add_video_request': ['common', 'logged_in'],
        'delete_video_request': ['common', 'logged_in'],
        'video_request_vote': ['common', 'logged_in']
    },

    'ContestsController': {
        '*': ['common'],
        'submit': ['common', 'logged_in']
    },

    'QuestionsController': {
        '*': ['common'],
        'ask': ['common', 'logged_in'],
        'edit': ['common', 'logged_in']
    },

    'SnippetsController': {
        '*': ['common'],
        'mine': ['common', 'logged_in']
    },

    'ScriptsController': {
        '*': ['common']
    },

    'VotesController': {
        '*': ['common', 'logged_in']
    },

    'admin/ContestsController': {
        '*': ['common', 'logged_in', 'is_admin']
    },

    'api/internal/ChatsController': {
        '*': ['common', 'api_internal_auth']
    },

    'api/internal/PistonController': {
        '*': ['common', 'api_internal_auth']
    },

    'api/v1/stats/DiscordController': {
        '*': ['common']
    },

    'api/v1/stats/PistonController': {
        '*': ['common', 'api_internal_auth']
    },

    'api/v1/PistonController': {
        '*': ['common']
    },

    'api/v1/UsersController': {
        '*': ['common']
    }

};
