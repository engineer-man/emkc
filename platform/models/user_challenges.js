const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user_challenges extends Sequelize.Model { }

    user_challenges.init(
        {
            user_challenge_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            challenge_id: DataTypes.INTEGER,
            language: DataTypes.STRING,
            solution: DataTypes.TEXT('medium'),
            created_at: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'user_challenges',
            freezeTableName: true,
            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            }
        }
    );

    return user_challenges;
};
