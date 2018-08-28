module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('tags', {
            tag_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING
        },
        {
            freezeTableName: true
        }
    );
};
