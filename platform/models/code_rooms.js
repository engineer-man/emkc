module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('code_rooms', {
            code_room_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            hash: DataTypes.STRING,
            code: DataTypes.TEXT('medium'),
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true,

            hooks: {
                async beforeCreate(instance) {
                    instance.created_at = util.now();

                    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

                    for (;;) {
                        instance.hash = '';
                        for (var i = 0; i < 6; ++i) {
                            instance.hash += letters[Math.floor(Math.random() * letters.length)];
                        }

                        var dupe = await db.code_rooms
                            .find_one({
                                where: {
                                    hash: instance.hash
                                }
                            });

                        if (!dupe) break;
                    }
                }
            },

            getterMethods: {
                url() {
                    return '/r/' + this.hash;
                }
            }
        }
    );
};
