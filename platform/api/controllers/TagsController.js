module.exports = {

    async search(req, res) {
        const name = req.query.name;

        let tags = await db.tags
            .find_all({
                where: {
                    name: {
                        $like: '%' + name + '%'
                    }
                },
                order: [
                    ['name']
                ],
                limit: 10
            });

        return res.send({
            status: 'ok',
            payload: {
                tags: name ? tags : []
            }
        });
    }

};
