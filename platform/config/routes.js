module.exports.routes = {

    'GET /': 'HomeController.home',
    'GET /logout': 'HomeController.logout',
    'GET /auth/discord': 'AuthController.discord',
    'GET /auth/discord_cb': 'AuthController.discord_cb',
    'GET /auth/discord_cb': 'AuthController.discord_cb',
    'GET /board': 'BoardController.home',

    // catch all (404)
    'ALL r|^/(?:(?!css|images|js|lib|other|robots\.txt|google*).)*$|': 'HomeController.fourohfour'

};
