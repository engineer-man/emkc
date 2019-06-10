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
                        <h5 class="f300">Main Menu</h5>
                        <a href="/">Home</a>
                        <a href="/challenges">Challenges</a>
                        <a href="/community">Community</a>
                        <a href="/snippets">Tools - Snippets</a>
                        <div class="spacer"></div>
                        <h5 class="f300">You</h5>
                        <a href="/">Profile</a>
                        <a href="/logout">Logout</a>
                    </div>
                </div>
            </div>
        )
    }

}
