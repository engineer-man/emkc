module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('sticker_orders', {
            sticker_order_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            is_fulfilled: DataTypes.INTEGER,
            tx: DataTypes.STRING,
            coupon: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            cost: DataTypes.DECIMAL(5,2),
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            address: DataTypes.TEXT,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true
        }
    );
};
