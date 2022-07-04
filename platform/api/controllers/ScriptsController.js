module.exports = {
    async home(req, res) {
        let scripts = await db.cli_scripts.find_all({
            where: {
                is_safe: constant.yes
            }
        });

        return res.view({
            scripts
        });
    },

    async view(req, res) {
        const cli_script_id = req.params.cli_script_id;

        let script = await db.cli_scripts.find_one({
            where: {
                cli_script_id
            }
        });

        return res.view({
            script
        });
    },

    async exec(req, res) {
        const cli_script_id = req.params.cli_script_id;

        let script = await db.cli_scripts.find_one({
            where: {
                cli_script_id
            }
        });

        res.set('content-type', 'text/plain');

        return res.status(200).send(script.content);
    }
};
