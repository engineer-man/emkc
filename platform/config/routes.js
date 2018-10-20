module.exports.routes = {

    'GET /': 'BoardController.home',
    'GET /logout': 'HomeController.logout',
    'GET /auth/discord': 'AuthController.discord',
    'GET /auth/discord_cb': 'AuthController.discord_cb',
    'GET /auth/discord_cb': 'AuthController.discord_cb',
    'GET /board': 'BoardController.home',

    'GET /community': 'CommunityController.home',
    'GET /community/about': 'CommunityController.about',
    'GET /community/power': 'CommunityController.power',
    'GET /community/video_requests': 'CommunityController.video_requests',
    'POST /community/add_video_request': 'CommunityController.add_video_request',
    'POST /community/delete_video_request': 'CommunityController.delete_video_request',
    'POST /community/video_request_vote': 'CommunityController.video_request_vote',

    'GET /challenges': 'ChallengesController.home',
    'GET /challenges/choose_language/:challenge_id': 'ChallengesController.choose_language',
    'POST /challenges/execute/:challenge_id': 'ChallengesController.execute',
    'GET /challenges/:challenge_id/:language': 'ChallengesController.challenge',

    'GET /questions/ask': 'QuestionsController.ask',
    'POST /questions/ask': 'QuestionsController.ask',
    'GET /questions/edit/:question_id': 'QuestionsController.edit',
    'POST /questions/edit/:question_id': 'QuestionsController.edit',
    'GET r|/d([0-9]+)/(.*)|question_id,name': 'QuestionsController.view',

    'POST /comments/create': 'CommentsController.create',
    'POST /comments/save': 'CommentsController.save',

    'POST /votes/handle/:type/:pk': 'VotesController.handle',

    'GET /snippets': 'SnippetsController.create',
    'POST /snippets': 'SnippetsController.create',
    'GET /s/:hash': 'SnippetsController.view',

    'GET /coderoom/new': 'CodeRoomsController.create',
    'POST /coderoom/sync': 'CodeRoomsController.sync',
    'POST /coderoom/save': 'CodeRoomsController.save',
    'GET /coderoom/users/:hash': 'CodeRoomsController.users',
    'GET /r/:hash': 'CodeRoomsController.view',

    'GET /tags/search': 'TagsController.search',

    'GET /@:username': 'ProfilesController.view',

    // piston
    'POST /api/v1/piston/execute': 'api/v1/PistonController.execute',

    // catch all (404)
    'ALL r|^\/(?!css|images|js|lib|other|robots\.txt|google*)|': 'HomeController.fourohfour',

};
