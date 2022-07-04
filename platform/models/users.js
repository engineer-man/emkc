const Sequelize = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    class users extends Sequelize.Model {}

    users.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            is_staff: DataTypes.INTEGER,
            display_name: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            discord_api: DataTypes.STRING,
            discord_rank: DataTypes.INTEGER,
            avatar_url: DataTypes.STRING,
            score: DataTypes.INTEGER,
            created_at: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'users',
            freezeTableName: true,
            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();

                    if (instance.password)
                        instance.password = crypto
                            .createHash('sha1')
                            .update(instance.password)
                            .digest('hex');
                },

                beforeUpdate(instance) {
                    if (instance.changed('password'))
                        instance.password = crypto
                            .createHash('sha1')
                            .update(instance.password)
                            .digest('hex');
                }
            }
        }
    );

    return users;
};
