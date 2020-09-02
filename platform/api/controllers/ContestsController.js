const moment = require('moment');

module.exports = {

    async home(req, res) {
        let past_contests = await db.contests
            .find_all({
                where: {
                    end_date: {
                        $lt: util.now()
                    }
                },
                include: [
                    {
                        model: db.contest_submissions,
                        as: 'submissions',
                        include: [
                            {
                                model: db.users,
                                as: 'user'
                            }
                        ]
                    }
                ]
            });

        let active_contests = await db.contests
            .find_all({
                where: {
                    start_date: {
                        $lte: util.now()
                    },
                    end_date: {
                        $gte: util.now()
                    }
                },
                include: [
                    {
                        model: db.contest_submissions,
                        as: 'submissions',
                        include: [
                            {
                                model: db.users,
                                as: 'user'
                            }
                        ]
                    }
                ],
                order: [
                    ['contest_id', 'desc'],
                    [{ model: db.contest_submissions, as: 'submissions'}, 'created_at']
                ]
            });

        return res.view({
            past_contests,
            active_contests,
        });
    },

    async contest(req, res) {
        const contest_id = req.params.contest_id;

        let contest = await db.contests
            .find_one({
                where: {
                    contest_id
                },
                include: [
                    {
                        model: db.contest_submissions,
                        as: 'submissions',
                        include: [
                            {
                                model: db.users,
                                as: 'user'
                            }
                        ]
                    }
                ]
            });

        if (!contest) {
            return res.redirect('/contests');
        }

        return res.view({
            contest
        });
    }

};
