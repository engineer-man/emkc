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
            const {title, description, start_date, end_date} = req.body;

            let contest = await db.contests
                .create({
                    title,
                    description,
                    start_date,
                    end_date
                });

            return res
                .status(200)
                .send();
        }

        return res.view();
    },

    async update(req, res) {
        const contest_id = req.params.contest_id;
        const {title, description, start_date, end_date} = req.body;

        let contest = await db.contests
            .find_one({
                where: {
                    contest_id
                }
            });

        contest.title = title;
        contest.description = description;
        contest.start_date = start_date;
        contest.end_date = end_date;

        await contest
            .save();

        return res
            .status(200)
            .send();
    }

};
