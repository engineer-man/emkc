module.exports = {

    async log(req, res) {
        let { server, user, discord_id, language, source } = req.body;

        if (!server || !user || !discord_id || !language || !source) {
            return res
                .status(400)
                .send();
        }

        await db.piston_runs
            .create({
                server,
                user,
                discord_id,
                language,
                source
            });

        return res
            .status(200)
            .send();
    }

};
