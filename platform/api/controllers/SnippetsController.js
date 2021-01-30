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

            if (req.headers.accept === 'application/json') {
                return res.status(200).send(snippet);
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
    },

    async delete(req, res) {
        const { hash } = req.params;


        let snippet = await db.snippets
            .find_one({
                where: {
                    hash,
                    user_id: req.local.user_id
                }
            });

        if (snippet) {
            await snippet.destroy();
        }

        return res
            .status(snippet ? 200 : 400)
            .send({
                url: '/snippets/mine'
            });
    },

    async edit(req, res) {
        const { hash }  = req.params;

        let snippet = await db.snippets
            .find_one({
                where: {
                    hash,
                    user_id: req.local.user_id
                }
            });

        if (req.method === 'POST') {
            const { language, snip } = req.body;

            try {
                if (!snippet) {
                    return res
                        .status(400)
                        .send({
                            url: '/snippets'
                        });
                }

                if (!snip) {
                    throw new Error('Please supply some code');
                }

                snippet.language = language;
                snippet.snip = snip;
                await snippet.save();

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

        if (!snippet) {
            return res.redirect('/snippets');
        }

        return res.view({
            snippet
        });
    }
};
