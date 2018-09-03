class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open(redirect) {
        this.setState({
            open: true,
            redirect
        });
    }

    close() {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div class={'em_login ' + (this.state.open ? 'open' : '')}>
                <div class="backdrop">
                    <div class="box">
                        <div class="close" onClick={this.close}>
                            <i class="fa fa-times"></i>
                        </div>
                        <h4>Login/Register</h4>
                        <p>
                            At the moment only Discord login is supported.
                        </p>
                        <a
                            href={'/auth/discord' + (this.state.redirect ? '?r=' + this.state.redirect : '')}
                            class="btn btn-block">Login with Discord</a>
                    </div>
                </div>
            </div>
        )
    }

}
