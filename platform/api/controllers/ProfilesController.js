module.exports = {

    async view(req, res) {
        try {
            const username = req.params.username;

            let user = await db.users
                .find_one({
                    where: {
                        username
                    }
                });

            if (!user) throw null;

            let challenges = await db.user_challenges
                .find_all({
                    where: {
                        user_id: user.user_id
                    },
                    include: [
                        {
                            model: db.challenges,
                            as: 'challenge'
                        }
                    ],
                    order: [
                        ['created_at', 'desc']
                    ]
                });

            return res.view({
                user,
                challenges
            });
        } catch(e) {
            return res.redirect('/');
        }
    },

    _config: {}

};
