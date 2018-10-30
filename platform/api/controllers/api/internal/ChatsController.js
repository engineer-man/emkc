const crypto = require('crypto');
const moment = require('moment');

module.exports = {

    last(req, res) {
        return db.discord_chat_messages
            .find_one({
                order: [
                    ['created_at', 'desc']
                ]
            })
            .then(message => {
                // this should only be a thing once, send beginning of time
                if (!message) {
                    return res.send({
                        last_timestamp: moment('1970-01-01').format()
                    });
                }

                return res.send({
                    last_timestamp: message.created_at
                })
            });
    },

    create(req, res) {
        var messages = req.body;

        // sometimes only a single message object will be sent, transparently convert to array
        if (!Array.is_array(messages)) messages = [messages];

        var inserted = 0;
        var duplicate = 0;
        var failed = 0;

        // filter out any messages that don't have all the necessary information
        messages = messages
            .filter(m => {
                var valid = m.channel &&
                    m.user &&
                    m.message &&
                    m.timestamp &&
                    moment(m.timestamp).isValid();

                if (!valid) ++failed;

                return valid;
            });

        return db.sequelize
            .transaction(t => {
                var chain = Promise.resolve(null);

                // basically just load each message and increment the proper counter
                messages.for_each(message => {
                    chain = chain
                        .then(() => {
                            var new_message = {
                                channel: message.channel,
                                user: message.user.replace(/[^\x00-\x7F]/g, ''),
                                message: message.message.replace(/[^\x00-\x7F]/g, ''),
                                created_at: moment(message.timestamp).format(),
                                hash: crypto
                                    .createHash('sha1')
                                    .update(JSON.stringify(message))
                                    .digest('hex')
                            };

                            return db.discord_chat_messages
                                .create(new_message, { transaction: t });
                        })
                        .then(() => {
                            ++inserted;
                        })
                        .catch(err => {
                            if (err.original.code && err.original.code === 'ER_DUP_ENTRY') {
                                ++duplicate;
                            } else {
                                console.log('eee')
                                console.log(err)
                                ++failed;
                            }
                        });
                });

                return chain;
            })
            .then(() => {
                return res.send(200, {
                    inserted,
                    duplicate,
                    failed
                });
            });
    },

    _config: {}

};
