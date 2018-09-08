const request = require('request-promise');
const q = require('q');

module.exports = {

    home(req, res) {
        return res.view();
    },

    login() {
        return res.view();
    },

    logout(req, res) {
        delete req.session.user_id;
        return res.redirect('back');
    },

    fourohfour(req, res) {
        res.status(404);
        return res.view('home/fourohfour');
    },

    _config: {}

};
