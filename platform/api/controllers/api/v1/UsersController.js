module.exports = {

    async read_all(req, res) {
        const { discord_id } = req.query;

        let query = {
            where: {},
            attributes: [
                'user_id',
                'discord_api',
                'username',
                'display_name',
                'score'
            ]
        };

        if (discord_id) {
            query.where.discord_api = discord_id;
        }

        let users = await db.users
            .find_all(query);

        return res
            .status(200)
            .send(users);
    },

    async read(req, res) {
        const user_id = req.params.user_id;

        let user = await db.users
            .find_one({
                where: {
                    user_id
                },
                attributes: [
                    'user_id',
                    'username',
                    'display_name',
                    'score'
                ]
            });

        if (!user) {
            return res
                .status(404)
                .send();
        }

        return res
            .status(200)
            .send(user);
    }

};
