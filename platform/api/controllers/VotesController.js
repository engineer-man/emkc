module.exports = {

    async handle(req, res) {
        let { type, pk } = req.params;
        let value = req.body.value;

        let vote = await db[type + '_votes']
            .find_one({
                where: {
                    [type + '_id']: pk,
                    user_id: req.glob.user_id
                }
            });

        if (vote) {
            await vote.destroy();
        }

        if (value && typeof value === 'number') {
            value = value < -1 ? -1 : value;
            value = value > 1 ? 1 : value;

            await db[type + '_votes']
                .create({
                    [type + '_id']: pk,
                    user_id: req.glob.user_id,
                    value
                });
        }

        return res.send({
            status: 'ok'
        });
    }

};
