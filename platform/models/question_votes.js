module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('question_votes', {
            question_vote_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            question_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            value: DataTypes.INTEGER
        },
        {
            freezeTableName: true
        }
    );
};
