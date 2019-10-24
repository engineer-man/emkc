module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('sticker_orders', {
            sticker_order_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            is_paid: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            cost: DataTypes.DECIMAL(5,2),
            name: DataTypes.STRING,
            address: DataTypes.TEXT,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true
        }
    );
};
