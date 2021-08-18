module.exports.routes = {

    'GET /': 'HomeController.home',
    'GET /logout': 'HomeController.logout',
    'GET /logout_as': 'HomeController.logout_as',
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
    'GET /contests/disallowed_languages/:contest_id': 'ContestsController.disallowed_languages',
    'GET /contests/:contest_id/:slug': 'ContestsController.contest',

    'GET /snippets': 'SnippetsController.create',
    'POST /snippets': 'SnippetsController.create',
    'GET /snippets/mine': 'SnippetsController.mine',
    'GET /s/:hash': 'SnippetsController.view',
    'GET /s/:hash/raw': 'SnippetsController.view',
    'POST /snippets/delete/:hash': 'SnippetsController.delete',
    'GET /snippets/edit/:hash': 'SnippetsController.edit',
    'POST /snippets/edit/:hash': 'SnippetsController.edit',

    'GET /scripts': 'ScriptsController.home',
    'GET /scripts/:cli_script_id/:slug': 'ScriptsController.view',
    'GET /exec/:cli_script_id': 'ScriptsController.exec',

    'GET /@:username': 'ProfilesController.view',
    'GET /@:username/challenges/:challenge_id/:language': 'ChallengesController.view_other',

    // admin
    'GET /admin': 'admin/DashboardController.dashboard',
    'GET /admin/contests': 'admin/ContestsController.view_all',
    'GET /admin/challenges': 'admin/ChallengesController.view_all',
    'GET /admin/challenges/update/:challenge_id': 'admin/ChallengesController.update',
    'POST /admin/challenges/update/:challenge_id': 'admin/ChallengesController.update',
    'GET /admin/challenges/create': 'admin/ChallengesController.create',
    'POST /admin/challenges/create': 'admin/ChallengesController.create',
    'POST /admin/tests/create': 'admin/ChallengesController.create_test',
    'POST /admin/tests/update/:challenge_test_id': 'admin/ChallengesController.update_test',
    'POST /admin/tests/delete/:challenge_test_id': 'admin/ChallengesController.delete_test',
    'GET /admin/contests/all': 'admin/ContestsController.view_all',
    'GET /admin/contests/create': 'admin/ContestsController.create',
    'POST /admin/contests/create': 'admin/ContestsController.create',
    'GET /admin/contests/update/:contest_id': 'admin/ContestsController.update',
    'POST /admin/contests/update/:contest_id': 'admin/ContestsController.update',
    'POST /admin/contests/delete/:contest_id': 'admin/ContestsController.delete',
    'POST /admin/submissions/validate/:contest_id': 'admin/ContestsController.validate_submissions',
    'POST /admin/submissions/delete': 'admin/ContestsController.delete_submission',
    'GET /admin/users': 'admin/UsersController.view_all',
    'GET /admin/users/login_as': 'admin/UsersController.login_as',
    'GET /admin/piston': 'admin/PistonController.view_all',
    'GET /admin/piston/packages': 'admin/PistonController.packages',
    'GET /admin/piston/install': 'admin/PistonController.install',
    'GET /admin/piston/uninstall': 'admin/PistonController.uninstall',

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
    'OPTIONS /api/v1/piston/versions': 'api/v1/PistonController.versions',
    'POST /api/v1/piston/execute': 'api/v1/PistonController.execute',
    'OPTIONS /api/v1/piston/execute': 'api/v1/PistonController.execute',
    'GET /api/v2/piston/runtimes': 'api/v2/PistonController.runtimes',
    'OPTIONS /api/v2/piston/runtimes': 'api/v2/PistonController.runtimes',
    'POST /api/v2/piston/execute': 'api/v2/PistonController.execute',
    'OPTIONS /api/v2/piston/execute': 'api/v2/PistonController.execute',

    // catch all (404)
    'ALL r|^\/(?!cdn|css|images|js|lib|other|robots\.txt|google*)|': 'HomeController.fourohfour',

};
