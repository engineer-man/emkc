const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class challenge_tests extends Sequelize.Model {}

    challenge_tests.init(
        {
            challenge_test_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            challenge_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            input: DataTypes.TEXT,
            output: DataTypes.TEXT
        },
        {
            sequelize,
            modelName: 'challenge_tests',
            freezeTableName: true
        }
    );

    return challenge_tests;
};
