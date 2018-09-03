const QuillDeltaToHtmlConverter = require('quill-delta-to-html');
const request = require('request-promise');

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
                },

                afterCreate(instance) {
                    db.questions
                        .find_one({
                            where: {
                                question_id: instance.question_id
                            },
                            include: [
                                {
                                    model: db.users,
                                    as: 'user'
                                }
                            ]
                        })
                        .then(question => {
                            if (!question) return null;

                            request
                                ({
                                    method: 'post',
                                    url: 'https://discordapp.com/api/v6/channels/483979558249562112/messages',
                                    headers: {
                                        Authorization: 'Bot ' + constant.secrets.felix
                                    },
                                    body: {
                                        title: 'some title here',
                                        embed: {
                                            title: instance.title,
                                            type: 'rich',
                                            color: 0x2ecc71,
                                            url: constant.base_url + instance.url,
                                            author: {
                                                name: 'New Question Posted'
                                            },
                                            footer: {
                                                icon_url: constant.gcloud_base_url + question.user.avatar_url,
                                                text: 'posted by ' + question.user.username
                                            }
                                        }
                                    },
                                    json: true
                                });
                        })
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
