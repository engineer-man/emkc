const request = require('request-promise');
const q = require('q');

module.exports = {

    home(req, res) {
        // request
        //     ({
        //         method: 'post',
        //         url: 'https://discordapp.com/api/v6/channels/482667860737654784/messages',
        //         headers: {
        //             Authorization: 'Bot NDc5ODczMjUzMDA0MDE3NjY0.Dlfk_Q.IVhb40EqoYBQju7NFTOcPZMJr9I'
        //         },
        //         form: {
        //             content: 'test'
        //         },
        //         json: true
        //     })

        return res.view();
    },

    login() {
        return res.view();
    },

    logout(req, res) {
        delete req.session.user_id;
        return res.redirect('/');
    },

    fourohfour(req, res) {
        res.status(404);
        return res.view('home/fourohfour');
    },

    _config: {}

};
