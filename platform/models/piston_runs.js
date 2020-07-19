module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('piston_runs', {
            piston_run_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            server: DataTypes.STRING,
            user: DataTypes.STRING,
            discord_id: DataTypes.STRING,
            language: DataTypes.STRING,
            source: DataTypes.TEXT,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true
        }
    );
};
