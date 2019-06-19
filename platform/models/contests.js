module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('contests', {
            contest_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE
        },
        {
            freezeTableName: true,

            getterMethods: {
                time_left() {
                    return '';
                }
            }
        }
    );
};
