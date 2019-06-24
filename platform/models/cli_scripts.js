module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('cli_scripts', {
            cli_script_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: DataTypes.INTEGER,
            is_public: DataTypes.INTEGER,
            is_safe: DataTypes.INTEGER,
            title: DataTypes.STRING,
            content: DataTypes.TEXT('medium'),
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
                view_url() {
                    return '/scripts/' + this.cli_script_id + '/' + util.slugify(this.title);
                },

                exec_url() {
                    return '/exec/' + this.cli_script_id;
                }
            }
        }
    );
};
