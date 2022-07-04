const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tags extends Sequelize.Model {}

    tags.init(
        {
            tag_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'tags',
            freezeTableName: true,
            hooks: {}
        }
    );

    return tags;
};
