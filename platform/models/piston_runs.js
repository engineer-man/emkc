const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class piston_runs extends Sequelize.Model {}

    piston_runs.init(
        {
            piston_run_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            server: DataTypes.STRING,
            server_id: DataTypes.STRING,
            user: DataTypes.STRING,
            user_id: DataTypes.STRING,
            language: DataTypes.STRING,
            source: DataTypes.TEXT,
            created_at: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'piston_runs',
            freezeTableName: true,
            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            }
        }
    );

    return piston_runs;
};
