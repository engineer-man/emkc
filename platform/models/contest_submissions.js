const Sequelize = require('sequelize');
const sanitize_html = require('sanitize-html');

const allowedTags = ['p', 'strong', 'em', 'u', 'blockquote', 'pre', 'span', 'a', 'ol', 'ul', 'li']
const allowedAttributes = {
    a: ['href', 'rel', 'target']
}
const allowedClasses = {
    pre: ['ql-syntax'],
    span: ['hljs-attribute']
}

module.exports = (sequelize, DataTypes) => {
    class contest_submissions extends Sequelize.Model { }

    contest_submissions.init(
        {
            contest_submission_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            contest_id: DataTypes.INTEGER,
            language: DataTypes.STRING,
            solution: DataTypes.TEXT('medium'),
            length: DataTypes.INTEGER,
            explanation: DataTypes.TEXT('medium'),
            award_place: DataTypes.INTEGER,
            award_points: DataTypes.INTEGER,
            created_at: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'contest_submissions',
            freezeTableName: true,
            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                    instance.explanation = sanitize_html(instance.explanation, {
                        allowedTags, allowedAttributes, allowedClasses
                    });
                },

                beforeUpdate(instance) {
                    instance.explanation = sanitize_html(instance.explanation, {
                        allowedTags, allowedAttributes, allowedClasses
                    });
                }
            }
        }
    );

    return contest_submissions;
};
