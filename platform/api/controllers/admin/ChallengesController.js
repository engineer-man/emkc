module.exports = {

    async view_all(req, res) {
        let challenges = await db.challenges.find_all({
            order: [
                ['challenge_id', 'desc']
            ]
        });

        return res.view({
            challenges
        });
    },

    async create(req, res) {
        if (req.method === 'POST') {
            const challenge = req.body;
            try {
                let created_challenge = await db.challenges.create(challenge);
                return res.status(200).send({
                    challenge_id: created_challenge.challenge_id
                });
            } catch(e) {
                return res.status(400).send();
            }
        }

        return res.view('admin/challenges/update', {
            mode: 'create',
            challenge: {
                difficulty: 1,
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

        let challenge = await db.challenges.find_one({
            where:
            {
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

        if (!challenge) {
            return res.redirect('back');
        }

        if (req.method === 'POST') {
            const challenge_to_edit = req.body;
            for (i in challenge_to_edit) {
                challenge[i] = challenge_to_edit[i];
            }
            try {
                await challenge.save();
                return res.status(200).send();
            } catch(e) {
                return res.status(400).send();
            }
        }

        return res.view({
            mode: 'update',
            challenge
        });
    },

    async create_test(req, res) {
        const { challenge_id, official, name, input, output } = req.body;
        try {
            await db.challenge_tests.create({
                challenge_id,
                official,
                name,
                input,
                output
            });
            return res.status(200).send();
        } catch(e) {
            return res.status(400).send();
        }
    },

    async update_test(req, res) {
        const test = req.body;
        let challenge_test_id = test.challenge_test_id;
        let test_to_update = await db.challenge_tests.find_one({
            where: {
                challenge_test_id
            }
        });
        if (!test_to_update) {
            return res.status(400).send();
        }
        for (i in test) {
            test_to_update[i] = test[i];
        }
        try {
            await test_to_update.save();
            return res.status(200).send();
        } catch(e) {
            return res.status(400).send();
        }
    },

    async delete_test(req, res) {
        const { challenge_test_id } = req.params;
        let test = await db.challenge_tests.find_one({
            where: {
                challenge_test_id
            }
        });
        if (test) {
            await test.destroy();
        }
        return res.status(200).send();
    }

}
