module.exports = {

    async view_all(req, res) {
        return res.view({
            message: null
        });
    },

    async packages(req, res) {
        let packages = await piston.packages();

        return res
            .status(200)
            .send(packages);
    },

    async install(req, res) {
        let { language, version } = req.query;

        let result = await piston.install(language, version);

        let message = result.language ? 'succeeded' : 'failed: ' + result.message;

        return res.view('admin/piston/view_all',{
            message: `Installation of ${language}-${version} ${message}`
        });

    },

    async uninstall(req, res) {
        let { language, version } = req.query;

        let result = await piston.uninstall(language, version);

        let message = result.language ? 'succeeded' : 'failed: ' + result.message;

        return res.view('admin/piston/view_all', {
            message: `Uninstallation of ${language}-${version} ${message}`
        });
    }

}
