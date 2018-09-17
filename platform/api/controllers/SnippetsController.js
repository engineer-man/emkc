const fs = require('fs');
const q = require('q');

module.exports = {

    view(req, res) {
        const { hash } = req.params;

        return db.snippets
            .find_one({
                where: {
                    hash
                }
            })
            .then(snippet => {
                if (!snippet) throw null;

                return res.view({
                    snippet
                });
            })
            .catch(err => {
                return res.redirect('/snippets');
            });
    },

    create(req, res) {
        if (req.method === 'POST') {
            const { language, snip } = req.body;

            return Promise.resolve(null)
                .then(() => {
                    if (!snip) {
                        throw new Error('Please supply some code');
                    }

                    return db.snippets
                        .create({
                            user_id: req.glob.user_id || null,
                            language,
                            snip
                        });
                })
                .then(snippet => {
                    return res.send({
                        status: 'ok',
                        payload: {
                            url: snippet.url
                        }
                    });
                })
                .catch(err => {
                    return res.send({
                        status: 'error',
                        payload: {
                            message: err.message
                        }
                    });
                });
        }
        return res.view();
    },

    _config: {}

};
