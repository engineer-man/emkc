module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('comments', {
            comment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            question_id: DataTypes.INTEGER,
            base_id: DataTypes.INTEGER,
            parent_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            comment: DataTypes.TEXT('medium'),
            depth: DataTypes.INTEGER,
            score: DataTypes.INTEGER,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true,

            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();

                    var model;

                    if (!instance.parent_id) {
                        model = db.questions
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
                            });
                    } else {
                        model = db.comments
                            .find_one({
                                where: {
                                    comment_id: instance.parent_id
                                },
                                include: [
                                    {
                                        model: db.users,
                                        as: 'user'
                                    }
                                ]
                            });
                    }

                    Promise.resolve(null)
                        .then(() => {
                            return [
                                model,
                                db.users
                                    .find_one({
                                        where: {
                                            user_id: instance.user_id
                                        }
                                    }),
                                db.questions
                                    .find_one({
                                        where: {
                                            question_id: instance.question_id
                                        }
                                    })
                            ];
                        })
                        .spread((record, author, question) => {
                            if (!record.user.discord_api) return null;
                            if (record.user_id === instance.user_id) return null;

                            discord
                                .api('post', '/users/@me/channels', {
                                    recipient_id: record.user.discord_api
                                })
                                .then(res => {
                                    return discord
                                        .api('post', '/channels/' + res.id + '/messages', {
                                            content:
                                                'Howdy! ' +
                                                author.display_name + ' replied to your comment on "' +
                                                question.title + '".\n'+
                                                'View their reply here: <' + constant.base_url + question.url + '>'
                                        });
                                })
                                .catch(err => {});
                        });
                },

                afterDestroy(instance) {
                    db.notifications
                        .destroy({
                            where: {
                                entity_type: constant.notifications.entity_type
                            }
                        });
                }
            },

            classMethods: {
                async resolve_base_id(parent_id) {
                    var parent;

                    parent = await db.comments
                        .find_one({
                            where: {
                                comment_id: parent_id
                            }
                        });

                    if (!parent) return null;
                    if (!parent.parent_id) return parent.comment_id;

                    for (;;) {
                        parent = await db.comments
                            .find_one({
                                where: {
                                    comment_id: parent.parent_id
                                }
                            });

                        if (!parent) return null;
                        if (!parent.parent_id) return parent.comment_id;
                    }
                }
            }
        }
    );
};
