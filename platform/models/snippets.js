const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('snippets', {
            snippet_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            hash: DataTypes.STRING,
            snip: DataTypes.TEXT('medium'),
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true,

            hooks: {
                async beforeCreate(instance) {
                    instance.created_at = util.now();

                    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

                    for (;;) {
                        instance.hash = '';
                        for (var i = 0; i < 6; ++i) {
                            instance.hash += letters[Math.floor(Math.random() * letters.length)];
                        }

                        var dupe = await db.snippets
                            .find_one({
                                where: {
                                    hash: instance.hash
                                }
                            });

                        if (!dupe) break;
                    }
                }
            },

            getterMethods: {
                url() {
                    return '/s/' + this.hash;
                },

                time_ago() {
                    return util.time_ago(this.created_at);
                }
            }
        }
    );
};
