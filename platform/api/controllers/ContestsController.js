const moment = require('moment');
const axios = require('axios');

module.exports = {

    async home(req, res) {
        let past_contests = await db.contests
            .find_all({
                where: {
                    draft: 0,
                    end_date: {
                        [$lt]: util.now()
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
                    ['contest_id', 'desc']
                ]
            });

        let active_contests = await db.contests
            .find_all({
                where: {
                    draft: 0,
                    start_date: {
                        [$lte]: util.now()
                    },
                    end_date: {
                        [$gte]: util.now()
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
        const { contest_id, slug } = req.params;

        let contest = await db.contests
            .find_one({
                where: {
                    contest_id
                },
                include: [
                    {
                        model: db.contest_submissions,
                        as: 'submissions',
                        attributes: [
                            'contest_submission_id',
                            'user_id',
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
                ],
                order: [
                    [{ model: db.contest_submissions, as: 'submissions' }, 'length'],
                    [{ model: db.contest_submissions, as: 'submissions' }, 'created_at'],
                ]
            });

        if (!contest  || slug !== contest.slug) {
            return res.redirect('/contests');
        }

        let awarded_languages = [];
        let awarded_users = [];
        let top = 1;

        let inputs = contest.input.split('\n').map(o => o.split('|'));
        let outputs = contest.output.split('\n');

        let cases = [];

        for (let i = 0; i < inputs.length; ++i) {
            cases.push({
                inputs: inputs[i],
                output: outputs[i]
            });
        }

        console.log(cases);

        contest.submissions
            .for_each((submission, i) => {
                // overall awards for top 3 solutions submitted by unique users
                if (!awarded_users.includes(submission.user_id) && top <= 3) {
                    switch (top) {
                        case 1:
                            submission.dataValues.overall_first = true;
                            break;
                        case 2:
                            submission.dataValues.overall_second = true;
                            break;
                        case 3:
                            submission.dataValues.overall_third = true;
                            break;
                    }

                    awarded_users.push(submission.user_id);

                    ++top;
                }

                // per language awards for top solution in each language
                if (!awarded_languages.includes(submission.language)) {
                    submission.dataValues.language_first = true;
                    awarded_languages.push(submission.language);
                }

                // hide the solution in the payload to prevent cheating
                if (contest.active) {
                    delete submission.dataValues.solution;
                }
            });

        let submissions = await db.contest_submissions
            .find_all({
                where: {
                    contest_id,
                    user_id: req.local.user_id
                }
            });

        return res.view({
            contest,
            cases,
            submissions
        });
    },

    async submit(req, res) {
        let { contest_id, language, solution } = req.body;

        solution = solution.trim();

        let contest = await db.contests
            .find_one({
                where: {
                    contest_id
                }
            });

        let test_cases = contest.input.split('\n');
        let expected_results = contest.output.split('\n');
        let languages = await axios.get(constant.get_piston_url() + '/versions');
        languages = languages.data.filter(lang => lang.name === language);

        // To prevent submissions by alias
        if (!contest.active || test_cases.length !== expected_results.length ||
            constant.contests.disallowed_languages.includes(language) ||
            !languages.length) {
            return res
                .status(400)
                .send({
                    error_message: 'An error has occurred while submitting your solution'
                });
        }

        let is_valid = await contests
            .check_submission_validity(test_cases, expected_results, solution, language);

        if (!is_valid) {
            return res
                .status(200)
                .send({
                    passed: false
                });
        }

        let submission = await db.contest_submissions
            .find_one({
                where: {
                    contest_id,
                    language,
                    user_id: req.local.user_id
                }
            });

        if (submission) {
            submission.language = language;
            submission.solution = solution;
            submission.length = new TextEncoder().encode(solution).length;

            let prev_length = submission.previous('length');

            if (submission.length < prev_length) {
                submission.created_at = util.now();

                discord
                    .api('post', `/channels/${constant.channels.emkc}/messages`, {
                        embed: {
                            title: contest.name,
                            description:
                                `Can you do better than this? ` +
                                `[Click here](${constant.base_url}${contest.url}) to give it a try.`,
                            type: 'rich',
                            color: 0x84e47f,
                            url: `${constant.base_url}${contest.url}`,
                            author: {
                                name:
                                    `${req.local.user.display_name} updated their ${submission.language} solution ` +
                                    `with one that is ${submission.length} bytes large ` +
                                    `(a ${prev_length-submission.length} byte improvement)`
                            },
                            footer: {
                                icon_url: constant.cdn_url + req.local.user.avatar_url,
                                text: `updated by ${req.local.user.display_name} right now`
                            }
                        }
                    })
                    .catch(err => {});
            }
            try {
                await submission.save();
            }
            catch (e) {
                let error_message = 'An error occurred while saving your solution'
                if (e.message.includes('Conversion')) {
                    error_message = 'Your submission includes disallowed characters'
                }
                return res
                    .status(400)
                    .send({
                        error_message
                    });
            }
        } else {
            try {
                submission = await db.contest_submissions
                .create({
                    user_id: req.local.user_id,
                    contest_id,
                    language,
                    solution,
                    length: new TextEncoder().encode(solution).length
                });
            }
            catch (e) {
                let error_message = 'An error occurred while saving your solution'
                if (e.message.includes('Conversion')) {
                    error_message = 'Your submission includes disallowed characters'
                }
                return res
                    .status(400)
                    .send({
                        error_message
                    });
            }

            discord
                .api('post', `/channels/${constant.channels.emkc}/messages`, {
                    embed: {
                        title: contest.name,
                        description:
                            `Can you make a better solution? ` +
                            `[Click here](${constant.base_url}${contest.url}) to give it a try.`,
                        type: 'rich',
                        color: 0x84e47f,
                        url: `${constant.base_url}${contest.url}`,
                        author: {
                            name:
                                `${req.local.user.display_name} submitted an initial ${submission.length} ` +
                                `byte solution with ${submission.language}`
                        },
                        footer: {
                            icon_url: constant.cdn_url + req.local.user.avatar_url,
                            text: `submitted by ${req.local.user.display_name} right now`
                        }
                    }
                })
                .catch(err => {});
        }

        return res
            .status(200)
            .send({
                passed: true
            });
    },

    async disallowed_languages(req, res) {
        let { contest_id } = req.params;
        let contest = await db.contests.find_one({
            where: {
                contest_id
            }
        });
        let disallowed_languages = contest.disallowed_languages
            ? contest.disallowed_languages.split(',') : [];
        return res
            .status(200)
            .send(disallowed_languages);
    },

    async default(req, res) {
        const { type } = req.params;
        switch (type) {
            case 'disallowed':
                return res.status(200).send(constant.contests.disallowed_languages);
            case 'golf':
                return res.status(200).send(constant.contests.golf_languages);
            // TODO: Add more options here and their equivalent arrays in constant.js
        }
    }

};
