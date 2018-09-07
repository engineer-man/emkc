module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('notifications', {
            notification_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            type: DataTypes.INTEGER,
            entity_type: DataTypes.INTEGER,
            entity_id: DataTypes.INTEGER,
            message: DataTypes.STRING,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true,

            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            }
        }
    );
};
