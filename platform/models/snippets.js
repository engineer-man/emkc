const Sequelize = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    class snippets extends Sequelize.Model {}

    snippets.init(
        {
            snippet_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            hash: DataTypes.STRING,
            language: DataTypes.STRING,
            snip: DataTypes.TEXT('medium'),
            created_at: DataTypes.DATE,

            // getters
            url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return '/s/' + this.hash;
                }
            },
            time_ago: {
                type: DataTypes.VIRTUAL,
                get() {
                    return util.time_ago(this.created_at);
                }
            }
        },
        {
            sequelize,
            modelName: 'snippets',
            freezeTableName: true,
            hooks: {
                async beforeCreate(instance) {
                    instance.created_at = util.now();

                    var letters =
                        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

                    for (;;) {
                        instance.hash = '';
                        for (var i = 0; i < 6; ++i) {
                            instance.hash +=
                                letters[
                                    Math.floor(Math.random() * letters.length)
                                ];
                        }

                        var dupe = await db.snippets.find_one({
                            where: {
                                hash: instance.hash
                            }
                        });

                        if (!dupe) break;
                    }
                }
            }
        }
    );

    return snippets;
};
