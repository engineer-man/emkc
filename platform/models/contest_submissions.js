module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('contest_submissions', {
            contest_submission_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            contest_id: DataTypes.INTEGER,
            language: DataTypes.STRING,
            solution: DataTypes.TEXT('medium'),
            length: DataTypes.INTEGER,
            award_place: DataTypes.INTEGER,
            award_points: DataTypes.INTEGER,
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
