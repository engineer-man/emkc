module.exports.routes = {

    'GET /': 'HomeController.home',
    'GET /logout': 'HomeController.logout',
    'GET /auth/discord': 'AuthController.discord',
    'GET /auth/discord_cb': 'AuthController.discord_cb',
    'GET /auth/discord_cb': 'AuthController.discord_cb',
    'GET /board': 'BoardController.home',

    'GET /questions/ask': 'QuestionsController.ask',
    'POST /questions/ask': 'QuestionsController.ask',
    'GET /questions/edit/:question_id': 'QuestionsController.edit',
    'POST /questions/edit/:question_id': 'QuestionsController.edit',
    'GET /d:question_id/:name': 'QuestionsController.view',

    'POST /comments/create': 'CommentsController.create',

    'POST /votes/handle/:type/:pk': 'VotesController.handle',

    'GET /snippets': 'SnippetsController.create',
    'POST /snippets': 'SnippetsController.create',
    'GET /s/:hash': 'SnippetsController.view',

    // catch all (404)
    'ALL r|^/(?:(?!css|images|js|lib|other|robots\.txt|google*).)*$|': 'HomeController.fourohfour'

};
