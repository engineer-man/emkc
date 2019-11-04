const request = require('request-promise');
const q = require('q');

module.exports = {

    home(req, res) {
        return Promise.resolve(null)
            .then(() => {
                return [
                    db.users
                        .find_all({
                            where: {
                                is_staff: {
                                    $ne: 1
                                }
                            },
                            order: [
                                ['score', 'desc'],
                                ['user_id']
                            ],
                            limit: 100
                        })
                ];
            })
            .spread((users) => {
                return res.view({
                    users
                });
            });
    },

    privacy(req, res) {
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
