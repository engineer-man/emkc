const QuillDeltaToHtmlConverter = require('quill-delta-to-html');

module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('questions', {
            question_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            question: DataTypes.TEXT('medium'),
            score: DataTypes.INTEGER,
            comments: DataTypes.INTEGER,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true,

            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            },

            getterMethods: {
                url() {
                    return '/d' + this.question_id + '/' + util.slugify(this.title);
                },

                slug() {
                    return util.slugify(this.title)
                },

                time_ago() {
                    return util.time_ago(this.created_at);
                },

                question_html() {
                    try {
                        const json = JSON.parse(this.question);

                        const converter = new QuillDeltaToHtmlConverter(json.ops, {});

                        return converter.convert();
                    } catch (e) {
                        return '';
                    }
                }
            }
        }
    );
};
