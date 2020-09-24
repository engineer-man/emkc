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
            if (!snippet) {
                throw null;
            }

            return res.view({
                snippet
            });
        } catch (e) {
            return res.redirect('/snippets');
        }
    },

    async mine(req, res) {
        let snippets = await db.snippets
            .find_all({
                where: {
                    user_id: req.local.user_id
                },
                order: [
                    ['snippet_id', 'desc']
                ]
            });

        return res.view({
            snippets
        });
    },

    async create(req, res) {
        if (req.method === 'POST') {
            const { language, snip } = req.body;

            try {
                if (!snip) {
                    throw new Error('Please supply some code');
                }

                let snippet = await db.snippets
                    .create({
                        user_id: req.local.user_id,
                        language,
                        snip
                    });

                return res
                    .status(200)
                    .send({
                        url: snippet.url
                    });
            } catch (e) {
                return res
                    .status(400)
                    .send({
                        message: e.message
                    });
            }
        }

        return res.view();
    }

};
