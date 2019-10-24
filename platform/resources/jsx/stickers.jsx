class Stickers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            done: false,
            env: props.mode || 'sandbox',
            quantity: 3,
            name: '',
            email: '',
            address: ''
        };
    }

    componentDidMount() {
        paypal.Button
            .render({
                env: this.props.env,
                client: {
                    sandbox: this.props.paypal_id,
                    production: this.props.paypal_id
                },
                locale: 'en_US',
                style: {
                    size: 'medium',
                    color: 'blue',
                    shape: 'rect',
                    tagline: false
                },
                commit: true,
                payment: function(data, actions) {
                    return actions.payment.create({
                        transactions: [{
                            amount: {
                                total: {
                                    3: '2.40',
                                    5: '3.50',
                                    10: '6.00'
                                }[this.state.quantity],
                                currency: 'USD'
                            },
                            description: this.state.quantity + ' 2" x 2" Engineer Man Stickers'
                        }]
                    });
                },
                onAuthorize: function(data, actions) {
                    console.log(data)
                    return actions.payment.execute().then(function() {
                        console.log('done');
                    });
                }
            }, '#paypal-button');
    }

    render() {
        return (
            <React.Fragment>
                <h4 class="f300">
                    Engineer Man Stickers 2" x 2"
                </h4>

                <img src="/images/sticker_2019.png" class="sticker" />

                <p>
                    Stickers are made with vinyl making them weatherproof and resistant to
                    scratching and fading. Stickers cannot be removed and reapplied.
                </p>

                <p>
                    First batch of stickers is 300 in total and are being sold at cost (possibly even a loss).
                    If you are already an Engineer Man supporter,
                    have donated during stream, have Nitro boosted our Discord server, have been granted
                    the role of Discord Hero, or attained the level of
                    EMKC Master, please message EngineerMan#0001 on Discord for free stickers.
                </p>

                <p>
                    <span class="f700">Privacy Notes:</span>
                    <ul>
                        <li>No payment information is received or stored by EMKC. Payment is handled entirely by PayPal.</li>
                        <li>Name and address is only stored until your stickers have shipped and then it is deleted.</li>
                        <li>Your email is used only to contact you if for some reason there is a problem processing your order.</li>
                    </ul>
                </p>

                <form>
                    <div class="form-group">
                        <label class="f700">Quantity</label>
                        <br />
                        <div class="quantity_option active">3 for $2.40</div>
                        {' '}
                        <div class="quantity_option">5 for $3.50</div>
                        {' '}
                        <div class="quantity_option">10 for $6.00</div>
                    </div>
                    <div class="form-group">
                        <label class="f700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            class="form-control"
                            placeholder="Enter your name here"
                            autocomplete="off"
                            onChange={this.handle_update} />
                    </div>

                    <div class="form-group">
                        <label class="f700">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="Enter your email here"
                            autocomplete="off"
                            onChange={this.handle_update} />
                    </div>

                    <div class="form-group">
                        <label class="f700">Address (anywhere in the world)</label>
                        <textarea
                            type="text"
                            id="address"
                            name="address"
                            class="form-control"
                            placeholder="Please enter exactly what should appear on an envelope"
                            autocomplete="off"
                            rows="5"
                            onChange={this.handle_update}>
                        </textarea>
                    </div>

                    <div class="form-group">
                        <label class="f700">Coupon</label>
                        <input
                            type="text"
                            id="coupon"
                            name="coupon"
                            class="form-control"
                            placeholder="If you have a coupon, enter it here"
                            autocomplete="off"
                            onChange={this.check_coupon} />
                    </div>
                </form>

                <div id="paypal-button"></div>
            </React.Fragment>
        )
    }

}
