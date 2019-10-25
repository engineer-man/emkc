class Stickers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            done: false,
            valid: false,
            discounted: false,
            env: props.env || 'sandbox',
            quantity: props.options[1].quantity,
            name: '',
            email: '',
            address: '',
            coupon: ''
        };

        this.handle_update = this.handle_update.bind(this);
        this.check_coupon = this.check_coupon.bind(this);
        this.submit = this.submit.bind(this);

        this.check_coupon_timer = null;
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
                payment: (data, actions) => {
                    return actions.payment.create({
                        transactions: [{
                            amount: {
                                total: this.props.options.find(option => option.quantity === this.state.quantity).cost,
                                currency: 'USD'
                            },
                            description: this.state.quantity + ' 2" x 2" Engineer Man Stickers'
                        }]
                    });
                },
                onAuthorize: (data, actions) => {
                    return actions.payment
                        .execute()
                        .then(() => {
                            axios
                                .post('/stickers/order', {
                                    tx: data.orderID,
                                    quantity: this.state.quantity,
                                    name: this.state.name,
                                    email: this.state.email,
                                    address: this.state.address,
                                    coupon: null
                                })
                                .then(res => {
                                    return bootbox
                                        .alert(
                                            'Your order was placed successfully, thanks. Please '+
                                            'reference Order ID #' + res.data.order_id + ' if necessary.',
                                            () => { location = location }
                                        );
                                });
                        });
                }
            }, '#paypal-button');
    }

    handle_update(e) {
        e.persist();

        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            if (e.target.id === 'coupon') {
                this.check_coupon();
            }

            this.setState({
                valid: this.state.name && this.state.email && this.state.address
            });
        });
    }

    check_coupon() {
        clearInterval(this.check_coupon_timer);
        this.check_coupon_timer = setTimeout(() => {
            return axios
                .get('/stickers/check_code/' + this.state.coupon)
                .then(res => {
                    let valid = res.data.valid;

                    if (valid) {
                        this.setState({
                            discounted: valid,
                            quantity: 2
                        });
                    }
                });
        }, 300);
    }

    submit(e) {
        return axios
            .post('/stickers/order', {
                tx: null,
                quantity: this.state.quantity,
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                coupon: this.state.valid ? this.state.coupon : null
            })
            .then(res => {
                if (res.status >= 300) {
                    return bootbox.alert('There was a problem submitting your order');
                }

                return bootbox
                    .alert(
                        'Your order was placed successfully, thanks. Please '+
                        'reference Order ID #' + res.data.order_id + ' if necessary.',
                        () => { location = location }
                    );
            });
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

                <form>
                    <div class="form-group">
                        <label class="f700">Quantity</label>
                        <br />
                        {this.state.discounted && (
                            <div class="quantity_option active">2 for FREE</div>
                        ) || (
                            this.props.options.filter(option => option.cost !== 'FREE').map(option => {
                                return (
                                    <React.Fragment>
                                        <div
                                            class={'quantity_option ' + (this.state.quantity === option.quantity && 'active')}
                                            onClick={() => this.setState({ quantity: option.quantity })}>{option.quantity} for ${option.cost}</div>
                                        {' '}
                                    </React.Fragment>
                                )
                            })
                        )}
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
                            disabled={this.state.discounted}
                            onChange={this.handle_update} />
                        {this.state.coupon && (
                            this.state.discounted && (
                                <small class="text-success">Coupon valid</small>
                            )
                        )}
                    </div>
                </form>
                {this.state.discounted && (
                    <button
                        type="button"
                        class="btn btn-success"
                        disabled={!this.state.valid}
                        onClick={this.submit}>Submit</button>
                ) || (
                    <div id="paypal-button" style={{ visibility: !this.state.discounted && this.state.valid ? 'visible' : 'hidden' }}></div>
                )}
            </React.Fragment>
        )
    }

}
