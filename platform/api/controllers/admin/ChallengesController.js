const create_tests = async (tests) => {
    for (const test of tests) {
        const { challenge_id, name, input, output } = test;
        await db.challenge_tests.create({ challenge_id, name, input, output });
    }
};

module.exports = {
    async view_all(req, res) {
        let challenges = await db.challenges.find_all({
            order: [['challenge_id', 'desc']]
        });

        return res.view({
            challenges
        });
    },

    async create(req, res) {
        if (req.method === 'POST') {
            try {
                const {
                    draft,
                    difficulty,
                    points,
                    name,
                    description,
                    html,
                    tests
                } = req.body;

                const created_challenge = await db.challenges.create({
                    draft,
                    difficulty,
                    points,
                    name,
                    description,
                    html
                });

                for (const test of tests) {
                    test.challenge_id = created_challenge.challenge_id;
                    if (!test_cases.are_valid(test)) {
                        return res.status(400).send({
                            message: `Invalid test cases in ${test.name}`
                        });
                    }
                }

                create_tests(tests);
                return res.status(200).send();
            } catch (e) {
                return res.status(400).send();
            }
        }

        return res.view('admin/challenges/update', {
            mode: 'create',
            challenge: {
                difficulty: 1,
                draft: true,
                points: 10,
                name: '',
                description: '',
                html: '',
                tests: []
            }
        });
    },

    async update(req, res) {
        const { challenge_id } = req.params;

        let existing_challenge = await db.challenges.find_one({
            where: {
                challenge_id
            },
            include: [
                {
                    required: false,
                    model: db.challenge_tests,
                    as: 'tests'
                }
            ]
        });

        if (!existing_challenge) {
            return res.redirect('back');
        }

        if (req.method === 'POST') {
            const {
                draft,
                difficulty,
                points,
                name,
                description,
                html,
                tests
            } = req.body;
            const challenge = {
                draft,
                difficulty,
                points,
                name,
                description,
                html
            };
            for (const attr in challenge) {
                existing_challenge[attr] = challenge[attr];
            }
            try {
                await db.challenge_tests.destroy({
                    where: { challenge_id: existing_challenge.challenge_id }
                });
                await existing_challenge.save();
                for (const test of tests) {
                    if (!test_cases.are_valid(test)) {
                        return res.status(400).send({
                            message: `Invalid test cases in ${test.name}`
                        });
                    }
                }
                create_tests(tests);
                return res.status(200).send();
            } catch (e) {
                return res.status(400).send();
            }
        }

        return res.view({
            mode: 'update',
            challenge: existing_challenge
        });
    }
};
