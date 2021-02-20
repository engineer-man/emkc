const moment = require('moment');

module.exports = {

    async usage(req, res) {
        let { start, end } = req.query;

        let query = {
            where: {
                [$and]: []
            }
        };

        if (start) {
            start = moment(start);

            if (start.isValid()) {
                query.where[$and].push({
                    created_at: {
                        [$gte]: start.format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }

        if (end) {
            end = moment(end);

            if (end.isValid()) {
                query.where[$and].push({
                    created_at: {
                        [$lte]: end.format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }

        let count = await db.piston_runs
            .count(query);

        return res
            .status(200)
            .send({
                count
            });
    }

};
