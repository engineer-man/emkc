const moment = require('moment');

module.exports = {
    async view_all(req, res) {
        let all_contests = await db.contests.find_all({
            order: [['contest_id', 'desc']]
        });

        return res.view({
            contests: all_contests
        });
    },

    async create(req, res) {
        if (req.method === 'POST') {
            const {
                name,
                description,
                start_date,
                end_date,
                input,
                output,
                disallowed_languages
            } = req.body;

            if (!contests.are_test_cases_valid({ input, output })) {
                return res.status(400).send({ message: 'Invalid test cases' });
            }

            await db.contests.create({
                name,
                description,
                start_date,
                end_date,
                input,
                output,
                disallowed_languages
            });

            return res.status(200).send();
        }
        let disallowed_languages =
            constant.contests.disallowed_languages.join(',');

        return res.view('admin/contests/update', {
            mode: 'create',
            contest: {
                name: '',
                description: '',
                start_date: moment()
                    .startOf('isoweek')
                    .add(6, 'days')
                    .format('YYYY-MM-DD 17:00:00'),
                end_date: moment()
                    .startOf('isoweek')
                    .add(9, 'days')
                    .format('YYYY-MM-DD 17:00:00'),
                input: '',
                output: '',
                disallowed_languages
            }
        });
    },

    async update(req, res) {
        const contest_id = req.params.contest_id;

        let contest = await db.contests.find_one({
            where: {
                contest_id
            }
        });

        if (req.method === 'POST') {
            const {
                name,
                description,
                start_date,
                end_date,
                input,
                output,
                disallowed_languages
            } = req.body;

            if (!contests.are_test_cases_valid({ input, output })) {
                return res.status(400).send({ message: 'Invalid test cases' });
            }

            contest.name = name;
            contest.description = description;
            contest.start_date = start_date;
            contest.end_date = end_date;
            contest.input = input;
            contest.output = output;
            contest.disallowed_languages = disallowed_languages;

            await contest.save();

            return res.status(200).send();
        }

        return res.view({
            contest,
            mode: 'update'
        });
    },

    async delete_submission(req, res) {
        const { contest_submission_id } = req.body;

        let submission = await db.contest_submissions.find_one({
            where: {
                contest_submission_id
            }
        });

        if (!submission) {
            return res.status(400).send();
        }

        await submission.destroy();

        return res.status(200).send();
    },

    async validate_submissions(req, res) {
        const { contest_id } = req.params;

        let contest = await db.contests.find_one({
            where: {
                contest_id
            },
            include: [
                {
                    required: false,
                    model: db.contest_submissions,
                    as: 'submissions',
                    include: [
                        {
                            model: db.users,
                            as: 'user',
                            attributes: ['username']
                        }
                    ]
                }
            ]
        });

        let test_cases = contests.get_cases(contest);

        let invalids = [];

        for (let submission of contest.submissions) {
            let is_valid = await contests.check_submission_validity(
                test_cases,
                submission.solution,
                submission.language,
                submission.language_version || '*' // Default to latest, just incase its blank
            );

            if (!is_valid) {
                invalids.push(submission);
            }
        }

        return res.status(200).send({
            invalids
        });
    }
};
