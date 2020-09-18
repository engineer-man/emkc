const moment = require('moment');

module.exports = {

    async usage(req, res) {
        let { start, end } = req.query;

        let query = {
            where: {
                [$and]: []
            },
            attributes: [
                'server',
                [db.sequelize.literal('count(*)'), 'uses'],
            ],
            order: [
                [db.sequelize.col('uses'), 'desc']
            ],
            group: [
                'server'
            ],
            limit: 1000
        };

        let dates = [];

        if (start) {
            start = moment(start);

            if (start.isValid()) {
                query.where.$and.push({
                    created_at: {
                        [$gte]: start.format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }

        if (end) {
            end = moment(end);

            if (end.isValid()) {
                query.where.$and.push({
                    created_at: {
                        [$lte]: end.format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }

        let stats = await db.piston_runs
            .find_all(query);

        return res.send(stats);
    }

};
