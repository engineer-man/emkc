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
                beforeCreate(instance) {
                    instance.created_at = util.now();
                    instance.hash = crypto
                        .createHash('sha1')
                        .update('' + +new Date() + Math.random() + '-' + Math.random())
                        .digest('hex');
                }
            },

            getterMethods: {
                url() {
                    return '/snippets/' + this.hash;
                },

                time_ago() {
                    return util.time_ago(this.created_at);
                }
            }
        }
    );
};
