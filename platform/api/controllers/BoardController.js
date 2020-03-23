module.exports = {

    async home(req, res) {
        let users = await db.users
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
            });

        return res.view({
            users
        });
    }

};
