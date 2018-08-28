module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('comments', {
            comment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            parent_id: DataTypes.INTEGER,
            question_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            comment: DataTypes.TEXT('medium'),
            score: DataTypes.INTEGER,
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
