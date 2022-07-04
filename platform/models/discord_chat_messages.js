const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class discord_chat_messages extends Sequelize.Model {}

    discord_chat_messages.init(
        {
            discord_chat_message_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            hash: DataTypes.STRING,
            channel: DataTypes.STRING,
            user: DataTypes.STRING,
            discord_id: DataTypes.STRING,
            message: DataTypes.STRING,
            created_at: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'discord_chat_messages',
            freezeTableName: true,
            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            }
        }
    );

    return discord_chat_messages;
};
