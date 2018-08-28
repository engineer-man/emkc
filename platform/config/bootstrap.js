process.env.TZ = 'UTC';

require('nocamel');

var path = require('path');

module.exports.bootstrap = cb => {
    root_dir = path.resolve(__dirname + '/../../');

    db = require(root_dir + '/platform/models/index.js');

    sails.glob = {root_dir};
    sails.twig = require(root_dir + '/platform/api/services/twig.js');
    sails.glob.constant = require(root_dir + '/platform/api/services/constant.js');
    sails.glob.epoch = +new Date();

    cb();
};
