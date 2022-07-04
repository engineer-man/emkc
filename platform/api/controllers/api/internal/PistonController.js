module.exports = {
    async log(req, res) {
        let { server, server_id, user, user_id, language, source } = req.body;

        if (
            !server ||
            !server_id ||
            !user ||
            !user_id ||
            !language ||
            !source
        ) {
            return res.status(400).send();
        }

        await db.piston_runs.create({
            server,
            server_id,
            user,
            user_id,
            language,
            source
        });

        return res.status(200).send();
    }
};
