module.exports = {

    search(req, res) {
        const name = req.query.name;

        return db.tags
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
            })
            .then(tags => {
                return res.send({
                    status: 'ok',
                    payload: {
                        tags: name ? tags : []
                    }
                });
            });
    },

    _config: {}

};
