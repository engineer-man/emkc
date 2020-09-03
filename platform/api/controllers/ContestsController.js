const moment = require('moment');
const axios = require('axios');

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
                attributes: [
                    'contest_id',
                    'name',
                    'description',
                    'start_date',
                    'end_date',
                ],
                include: [
                    {
                        model: db.contest_submissions,
                        as: 'submissions',
                        attributes: [
                            'language',
                            'solution',
                            'length',
                            'created_at'
                        ],
                        include: [
                            {
                                model: db.users,
                                as: 'user',
                                attributes: [
                                    'username',
                                    'avatar_url',
                                ]
                            }
                        ]
                    }
                ]
            });

        let submission = await db.contest_submissions
            .find_one({
                where: {
                    contest_id,
                    user_id: req.local.user_id || null
                }
            });

        if (!contest) {
            return res.redirect('/contests');
        }

        return res.view({
            contest,
            submission
        });
    },

    async submit(req, res) {
        const { contest_id, language, solution } = req.body;

        let contest = await db.contests
            .find_one({
                where: {
                    contest_id
                }
            });

        let submission = await db.contest_submissions
            .find_one({
                where: {
                    contest_id,
                    user_id: req.local.user_id || null
                }
            });

        if (!contest.active) {
            return res
                .status(400)
                .send();
        }

        let test_result = await axios
            ({
                method: 'post',
                url: 'http://' + sails.config.piston.host + '/execute',
                data: {
                    language,
                    source: solution,
                    args: contest.input.trim().split('\n')
                }
            });

        let passed = test_result.data.output === contest.output;

        if (passed) {
            if (submission) {
                submission.language = language;
                submission.solution = solution;
                submission.length = solution.trim().length;

                let prev_length = submission.previous('length');

                if (submission.length < prev_length) {
                    submission.created_at = util.now();
                }

                await submission
                    .save();
            } else {
                await db.contest_submissions
                    .create({
                        user_id: req.local.user_id,
                        contest_id,
                        language,
                        solution,
                        length: solution.trim().length
                    });
            }
        }

        return res
            .status(200)
            .send({
                passed
            });
    }

};
