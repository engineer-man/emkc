module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('piston_runs', {
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
            freezeTableName: true,

            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            }
        }
    );
};
