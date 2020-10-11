const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class awards extends Sequelize.Model { }

    awards.init(
        {
            award_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: DataTypes.INTEGER,
            points: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            ref_type: DataTypes.INTEGER,
            ref_id: DataTypes.INTEGER,
            created_at: DataTypes.DATE,

            // getters
            tooltip_text: {
                type: DataTypes.VIRTUAL,
                get() {
                    return {
                        [constant.awards.type.contest_first_overall]: 'Placed 1st overall in a contest',
                        [constant.awards.type.contest_second_overall]: 'Placed 2nd overall in a contest',
                        [constant.awards.type.contest_third_overall]: 'Placed 3rd overall in a contest',
                        [constant.awards.type.contest_first_language]: 'Placed 1st for a specific language in a contest',
                        [constant.awards.type.general_participation]: 'Participation',
                    }[this.type] || '';
                }
            },
        },
        {
            sequelize,
            modelName: 'awards',
            freezeTableName: true,
            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            }
        }
    );

    return awards;
};
