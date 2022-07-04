const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class sticker_orders extends Sequelize.Model {}

    sticker_orders.init(
        {
            sticker_order_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            is_fulfilled: DataTypes.INTEGER,
            tx: DataTypes.STRING,
            coupon: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            cost: DataTypes.DECIMAL(5, 2),
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            address: DataTypes.TEXT,
            created_at: DataTypes.DATE
        },
        {
            sequelize,
            modelName: 'sticker_orders',
            freezeTableName: true,
            hooks: {
                beforeCreate(instance) {
                    instance.created_at = util.now();
                }
            }
        }
    );

    return sticker_orders;
};
