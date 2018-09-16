process.env.TZ = 'UTC';

require('nocamel');

const path = require('path');
root_dir = path.resolve(__dirname + '/../../');

Promise = require('bluebird');

const code_rooms = require(root_dir + '/platform/api/services/code_rooms.js');

module.exports.bootstrap = cb => {
    db = require(root_dir + '/platform/models/index.js');

    sails.glob = {root_dir};
    sails.twig = require(root_dir + '/platform/api/services/twig.js');
    sails.glob.constant = require(root_dir + '/platform/api/services/constant.js');
    sails.glob.epoch = +new Date();

    sails.io.sockets.on('connection', socket => {
        // test for code room socket
        var hash = /\/r\/([a-zA-Z0-9]+)/gi.exec(socket.handshake.headers.referer)
        hash = hash.length > 1 ? hash[1] : null;

        if (hash) return code_rooms.handle_socket_actions(socket, hash);
    });

    cb();
};
