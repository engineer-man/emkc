module.exports = {

    async view_all(req, res) {
        let contests = await db.contests
            .find_all();

        return res.view({
            contests
        });
    },

    async create(req, res) {
        if (req.method === 'POST') {
            const { draft, name, description, start_date, end_date, input, output } = req.body;

            let contest = await db.contests
                .create({
                    draft,
                    name,
                    description,
                    start_date,
                    end_date,
                    input,
                    output
                });

            return res
                .status(200)
                .send();
        }

        return res.view();
    },

    async update(req, res) {
        const contest_id = req.params.contest_id;

        let contest = await db.contests
            .find_one({
                where: {
                    contest_id
                }
            });

        if (req.method === 'POST') {
            const { draft, name, description, start_date, end_date, input, output } = req.body;

            contest.draft = draft;
            contest.name = name;
            contest.description = description;
            contest.start_date = start_date;
            contest.end_date = end_date;
            contest.input = input;
            contest.output = output;

            await contest
                .save();

            return res
                .status(200)
                .send();
        }

        return res.view({
            contest,
            mode: 'update'
        });
    }

};
