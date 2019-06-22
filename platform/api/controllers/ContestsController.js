const moment = require('moment');

module.exports = {

    async home(req, res) {
        let past_contests = await db.contests
            .find_all({
                where: {
                    end_date: {
                        $lt: util.now()
                    }
                }
            });

        let active_contests = await db.contests
            .find_all({
                where: {
                    start_date: {
                        $lte: util.now()
                    },
                    end_date: {
                        $gte: util.now()
                    }
                }
            });

        return res.view({
            past_contests,
            active_contests,
        });
    },

    _config: {}

};
