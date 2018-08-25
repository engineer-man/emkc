process.env.TZ = 'UTC';
process.setMaxListeners(0);

require('nocamel');

root_dir = require('path').resolve(__dirname + '/../../');

sails = {
    config: require('../config/local.js')
};

constant = require('../api/services/constant.js');
dispenserd = require('../api/services/dispenserd.js');
elasticsearch = require('../api/services/elasticsearch.js');
twig = require('../api/services/twig.js');
util = require('../api/services/util.js');
views = require('../api/services/views.js');
db = require('../models/index.js');
