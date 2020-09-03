const crypto = require('crypto');
const moment = require('moment');

module.exports = {

    async last(req, res) {
        let message = await db.discord_chat_messages
            .find_one({
                order: [
                    ['created_at', 'desc']
                ]
            });

        // this should only be a thing once, send beginning of time
        if (!message) {
            return res.send({
                last_timestamp: moment('1970-01-01').format()
            });
        }

        return res
            .status(200)
            .send({
                last_timestamp: message.created_at
            });
    },

    async create(req, res) {
        let messages = req.body;

        // sometimes only a single message object will be sent, transparently convert to array
        if (!Array.is_array(messages)) messages = [messages];

        let inserted = 0;
        let duplicate = 0;
        let failed = 0;

        // filter out any messages that don't have all the necessary information
        messages = messages
            .filter(m => {
                let valid = m.channel &&
                    m.user &&
                    m.discord_id &&
                    m.message &&
                    m.timestamp &&
                    moment(m.timestamp).isValid();

                if (!valid) ++failed;

                return valid;
            });

        let t = await db.sequelize
            .transaction();

        try {
            for (const message of messages) {
                let new_message = {
                    channel: message.channel,
                    user: message.user.replace(/[^\x00-\x7F]/g, ''),
                    discord_id: message.discord_id,
                    message: message.message.replace(/[^\x00-\x7F]/g, ''),
                    created_at: moment(message.timestamp).format()
                };

                let hash = crypto
                    .createHash('sha1')
                    .update(JSON.stringify(new_message))
                    .digest('hex');

                new_message.hash = hash;

                try {
                    await db.discord_chat_messages
                        .create(new_message, { transaction: t });

                    ++inserted;
                } catch (e) {
                    if (err.original.code && err.original.code === 'ER_DUP_ENTRY') {
                        ++duplicate;
                    } else {
                        ++failed;
                    }
                }
            }

            await t.commit();
        } catch (e) {
            await t.rollback();
        }

        return res
            .status(200)
            .send({
                inserted,
                duplicate,
                failed
            });
    }
};
