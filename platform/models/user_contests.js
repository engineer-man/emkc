module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('user_contests', {
            user_contest_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            contest_id: DataTypes.INTEGER,
            language: DataTypes.STRING,
            solution: DataTypes.TEXT('medium'),
            length: DataTypes.INTEGER,
            points: DataTypes.INTEGER,
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
