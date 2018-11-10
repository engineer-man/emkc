const moment = require('moment');

module.exports = {

    messages(req, res) {
        var { term, start, end, limit } = req.query;

        var query = {
            where: {
                $and: []
            },
            attributes: [
                'user',
                [db.sequelize.literal('count(*)'), 'messages'],
            ],
            order: [
                [db.sequelize.col('messages'), 'desc']
            ],
            group: [
                'user'
            ],
            limit: 1000
        };

        var dates = [];

        if (term) {
            query.where.message = {
                $like: '%' + term + '%'
            };
        }

        if (start) {
            start = moment(start);

            if (start.isValid()) {
                query.where.$and.push({
                    created_at: {
                        $gte: start.format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }

        if (end) {
            end = moment(end);

            if (end.isValid()) {
                query.where.$and.push({
                    created_at: {
                        $lte: end.format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }

        if (limit > 0 && limit <= 1000) {
            query.limit = +limit;
        }

        return db.discord_chat_messages
            .find_all(query)
            .then(stats => {
                return res.send(stats);
            });
    },

    channels(req, res) {
        var { user, start, end, limit } = req.query;

        var query = {
            where: {
                $and: []
            },
            attributes: [
                'channel',
                [db.sequelize.literal('count(*)'), 'messages'],
            ],
            order: [
                [db.sequelize.col('messages'), 'desc']
            ],
            group: [
                'channel'
            ],
            limit: 1000
        };

        var dates = [];

        if (user) {
            query.where.user = {
                $like: '%' + user.replace(/[^\x00-\x7F]/g, '') + '%'
            };
        }

        if (start) {
            start = moment(start);

            if (start.isValid()) {
                query.where.$and.push({
                    created_at: {
                        $gte: start.format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }

        if (end) {
            end = moment(end);

            if (end.isValid()) {
                query.where.$and.push({
                    created_at: {
                        $lte: end.format('YYYY-MM-DD HH:mm:ss')
                    }
                });
            }
        }

        if (limit > 0 && limit <= 1000) {
            query.limit = +limit;
        }

        return db.discord_chat_messages
            .find_all(query)
            .then(stats => {
                return res.send(stats);
            });
    },

    _config: {}

};
