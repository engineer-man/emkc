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
