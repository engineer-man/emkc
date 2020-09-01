module.exports = {

    async view_all(req, res) {
        let contests = await db.contests
            .find_all();

        return res.view({
            contests
        });
    }

};
