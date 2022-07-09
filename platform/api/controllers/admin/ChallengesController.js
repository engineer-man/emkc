const create_tests = async (tests) => {
    for (const test of tests) {
        const { challenge_id, name, input, output } = test;
        await db.challenge_tests.create({ challenge_id, name, input, output });
    }
};

const unify_tests_challenge_id = (tests, challenge_id) => {
    for (const test of tests) {
        test.challenge_id = challenge_id;
    }
};

const find_invalid_test = (tests) => {
    for (const test of tests) {
        if (!test_cases.are_valid(test)) {
            return test;
        }
    }
    return null;
};

const get_tests_errors = (tests) => {
    if (tests.length === 0) {
        return 'The challenge tests can not be empty';
    }
    const invalid_test = find_invalid_test(tests);
    if (invalid_test !== null) {
        return `The number of inputs does not match the number of outputs in ${invalid_test.name} test`;
    }
    return null;
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

                unify_tests_challenge_id(tests, created_challenge.challenge_id);
                const error_message = get_tests_errors(tests);
                if (error_message !== null) {
                    await created_challenge.destroy();
                    return res.status(400).send({
                        message: error_message
                    });
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
                unify_tests_challenge_id(
                    tests,
                    existing_challenge.challenge_id
                );
                const error_message = get_tests_errors(tests);
                if (error_message !== null) {
                    return res.status(400).send({
                        message: error_message
                    });
                }
                await existing_challenge.save();
                await db.challenge_tests.destroy({
                    where: { challenge_id: existing_challenge.challenge_id }
                });
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
