const fs = require('fs');
const q = require('q');

module.exports = {

    async view(req, res) {
        const { hash } = req.params;

        let snippet = await db.snippets
            .find_one({
                where: {
                    hash
                }
            });

        try {
            if (!snippet) throw null;

            return res.view({
                snippet
            });
        } catch(e) {
            return res.redirect('/snippets');
        }
    },

    async mine(req, res) {
        let snippets = await db.snippets
            .find_all({
                where: {
                    user_id: req.glob.user_id
                },
                order: [
                    ['snippet_id', 'desc']
                ]
            });

        return res.view({
            snippets
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
