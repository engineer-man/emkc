module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('question_tags', {
            question_tag_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            question_id: DataTypes.INTEGER,
            tag_id: DataTypes.INTEGER
        },
        {
            freezeTableName: true
        }
    );
};
