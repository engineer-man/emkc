import React from 'react';

import Util from 'js/util';

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
                        <a href="/contests">Contests</a>
                        <a href="/community">Community</a>
                        <a href="/snippets">Tools - Snippets</a>
                        {ctx.user_id && (
                            <>
                                <div class="spacer"></div>
                                <h5 class="f300">You</h5>
                                <a href={'/@' + ctx.username}>Profile</a>
                                <a href="/logout">Logout</a>
                            </>
                        ) || null}
                    </div>
                </div>
            </div>
        )
    }

}

window.mobile_nav = Util.try_render('react_mobile_nav', MobileNav);

export default MobileNav;
