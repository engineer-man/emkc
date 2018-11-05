class MobileNav extends React.Component {

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
            open: true
        });
    }

    close() {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div class={'em_mobile_nav ' + (this.state.open ? 'open' : '')}>
                <div class="backdrop" onClick={this.close}></div>
                <div class="menu">
                    <div class="contents">
                        Hope you weren't expecting an actual mobile menu
                    </div>
                </div>
            </div>
        )
    }

}
