const moment = require('moment');

module.exports = {

    async usage(req, res) {
        let { start, end, category } = req.query;

        let query = {
            where: {
                [$and]: []
            }
        };

        let where = query.where[$and];

        switch (category) {
            case 'bot':
                where.push({
                    server_id: {
                        [$ne]: null
                    }
                });
                break;
            case 'emkc':
                where.push({
                    server_id: null
                });
                where.push({
                    server: 'EMKC'
                });
                break;
            case 'direct':
                where.push({
                    server_id: null
                });
                where.push({
                    server: 'Piston API'
                });
                break;
        }

        if (start) {
            start = moment(start);

            if (start.isValid()) {
                where.push({
                    created_at: {
                        [$gte]: start.format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }

        if (end) {
            end = moment(end);

            if (end.isValid()) {
                where.push({
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
