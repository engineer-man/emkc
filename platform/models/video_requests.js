module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('video_requests', {
            video_request_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true
        }
    );
};
