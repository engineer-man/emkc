const moment = require('moment');

module.exports = {
    stickers(req, res) {
        return res.view({
            options: [
                { quantity: 2, cost: 'FREE' },
                { quantity: 3, cost: '2.40' },
                { quantity: 5, cost: '3.50' },
                { quantity: 10, cost: '6.00' }
            ]
        });
    },

    async order_stickers(req, res) {
        const { tx, quantity, name, email, address, coupon } = req.body;

        if (!coupon && !tx) {
            return res.status(400).send();
        }

        let order = await db.sticker_orders.create({
            tx,
            coupon,
            quantity,
            cost: {
                2: null,
                3: 2.4,
                5: 3.5,
                10: 6.0
            }[quantity],
            name,
            email,
            address,
            created_at: moment()
        });

        return res.status(200).send({
            order_id: order.sticker_order_id
        });
    },

    check_code(req, res) {
        return res.status(200).send({
            valid:
                req.params.code.to_upper_case() === sails.config.paypal.coupon
        });
    }
};
