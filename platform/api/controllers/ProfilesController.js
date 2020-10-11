module.exports = {

    async view(req, res) {
        const username = req.params.username;

        let user = await db.users
            .find_one({
                where: {
                    username
                }
            });

        if (!user) {
            return res.redirect('/');
        }

        let stat_challenges = await db.challenges
            .find_all({
                include: [
                    {
                        model: db.user_challenges,
                        as: 'solutions',
                        where: {
                            user_id: user.user_id
                        }
                    }
                ]
            });

        let stat_contests = await db.contests
            .find_all({
                include: [
                    {
                        model: db.contest_submissions,
                        as: 'submissions',
                        where: {
                            user_id: user.user_id
                        }
                    }
                ]
            });

        let awards = await db.awards
            .find_all({
                where: {
                    user_id: user.user_id
                },
                order: [
                    ['type']
                ]
            });

        awards = awards
            .reduce((a, c) => {
                let entry = a.find(e => e.type === c.type);

                if (entry) {
                    ++entry.count;
                } else {
                    a.push({
                        type: c.type,
                        count: 1,
                        tooltip_text: c.tooltip_text
                    });
                }

                return a;
            }, []);

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
                ],
                limit: 5
            });

        let user_solved_challenges = await db.user_challenges
            .find_all({
                where: {
                    user_id: req.local.user_id
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
            stat_challenges: stat_challenges.length,
            stat_contests: stat_contests.length,
            awards,
            challenges,
            user_solved_challenges: user_solved_challenges.map(challenge => {
                return {
                    challenge_id: challenge.challenge_id,
                    language: challenge.language
                };
            })
        });
    }

};
