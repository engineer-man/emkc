module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('comment_votes', {
            comment_vote_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            comment_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            value: DataTypes.INTEGER
        },
        {
            freezeTableName: true
        }
    );
};
