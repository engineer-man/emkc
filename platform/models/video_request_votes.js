module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('video_request_votes', {
            video_request_vote_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            video_request_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER
        },
        {
            freezeTableName: true
        }
    );
};
