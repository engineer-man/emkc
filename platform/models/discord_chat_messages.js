module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('discord_chat_messages', {
            discord_chat_message_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            hash: DataTypes.STRING,
            channel: DataTypes.STRING,
            user: DataTypes.STRING,
            message: DataTypes.STRING,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true
        }
    );
};
