module.exports = {

    async read_all(req, res) {
        let users = await db.users
            .find_all({
                attributes: [
                    'user_id',
                    'username',
                    'display_name',
                    'score'
                ]
            });

        return res.send(users);
    },

    async read(req, res) {
        const { discord_id } = req.query;

        let query = {
            attributes: [
                'user_id',
                'username',
                'display_name',
                'score'
            ]
        };

        if (discord_id) {
            where.discord_api = discord_id;
        }

        let users = await db.users
            .find_one(query);

        if (!user) {
            return res
                .status(404)
                .send();
        }

        return res.send(user);
    },

    _config: {}

};
