const fs = require('fs');

module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('challenges', {
            challenge_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            difficulty: DataTypes.INTEGER,
            points: DataTypes.INTEGER,
            folder: DataTypes.STRING,
            name: DataTypes.STRING,
            description: DataTypes.STRING
        },
        {
            freezeTableName: true,

            getterMethods: {
                difficulty_name() {
                    return {
                        [constant.challenges.difficulty.easy]: 'easy',
                        [constant.challenges.difficulty.medium]: 'medium',
                        [constant.challenges.difficulty.hard]: 'hard',
                    }[this.difficulty] || null;
                }
            }
        }
    );
};
