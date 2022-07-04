const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class cli_scripts extends Sequelize.Model {}

    cli_scripts.init(
        {
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
            created_at: DataTypes.DATE,

            // getters
            view_url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return (
                        '/scripts/' +
                        this.cli_script_id +
                        '/' +
                        util.slugify(this.title)
                    );
                }
            },
            exec_url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return '/exec/' + this.cli_script_id;
                }
            }
        },
        {
            sequelize,
            modelName: 'cli_scripts',
            freezeTableName: true,
            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            }
        }
    );

    return cli_scripts;
};
