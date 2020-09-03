module.exports.routes = {

    'GET /': 'HomeController.home',
    'GET /logout': 'HomeController.logout',
    'GET /auth/discord': 'AuthController.discord',
    'GET /auth/discord_cb': 'AuthController.discord_cb',
    'GET /privacy': 'HomeController.privacy',
    //'GET /stickers': 'MerchController.stickers',
    //'POST /stickers/order': 'MerchController.order_stickers',
    //'GET /stickers/check_code/:code': 'MerchController.check_code',

    'GET /community': 'CommunityController.home',
    'GET /community/about': 'CommunityController.about',
    'GET /community/power': 'CommunityController.power',

    'GET /challenges': 'ChallengesController.home',
    'GET /challenges/choose_language/:challenge_id': 'ChallengesController.choose_language',
    'POST /challenges/execute/:challenge_id': 'ChallengesController.execute',
    'GET /challenges/:challenge_id/:language': 'ChallengesController.challenge',

    'GET /contests': 'ContestsController.home',
    'POST /contests/submit': 'ContestsController.submit',
    'GET /contests/:contest_id/*': 'ContestsController.contest',

    'GET /snippets': 'SnippetsController.create',
    'POST /snippets': 'SnippetsController.create',
    'GET /snippets/mine': 'SnippetsController.mine',
    'GET /s/:hash': 'SnippetsController.view',

    'GET /scripts': 'ScriptsController.home',
    'GET /scripts/:cli_script_id/:slug': 'ScriptsController.view',
    'GET /exec/:cli_script_id': 'ScriptsController.exec',

    'GET /@:username': 'ProfilesController.view',
    'GET /@:username/challenges/:challenge_id/:language': 'ChallengesController.view_other',

    // admin
    'GET /admin': 'admin/DashboardController.dashboard',
    'GET /admin/contests': 'admin/ContestsController.view_all',
    'GET /admin/contests/all': 'admin/ContestsController.view_all',
    'GET /admin/contests/update/:contest_id': 'admin/ContestsController.update',
    'POST /admin/contests/update/:contest_id': 'admin/ContestsController.update',

    // service api
    'GET /api/internal/chats/last': 'api/internal/ChatsController.last',
    'POST /api/internal/chats': 'api/internal/ChatsController.create',
    'POST /api/internal/piston/log': 'api/internal/PistonController.log',

    // public api endpoints
    'GET /api/v1/stats/discord/messages': 'api/v1/stats/DiscordController.messages',
    'GET /api/v1/stats/discord/channels': 'api/v1/stats/DiscordController.channels',
    'GET /api/v1/stats/piston/usage': 'api/v1/stats/PistonController.usage',
    'GET /api/v1/users': 'api/v1/UsersController.read_all',
    'GET /api/v1/users/:user_id': 'api/v1/UsersController.read',
    'GET /api/v1/piston/versions': 'api/v1/PistonController.versions',
    'POST /api/v1/piston/execute': 'api/v1/PistonController.execute',

    // catch all (404)
    'ALL r|^\/(?!cdn|css|images|js|lib|other|robots\.txt|google*)|': 'HomeController.fourohfour',

};
