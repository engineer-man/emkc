import React from 'react';
import axios from 'axios';

import Util from 'js/util';

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = { users: props.users };
        this.search = this.search.bind(this);
    }

    search(e) {
        let users = this.props.users.filter((user) =>
            user.display_name.toLowerCase().includes(e.target.value)
        );
        this.setState({
            users,
        });
    }

    render() {
        return (
            <div>
                <div class="clearfix">
                    <input
                        class="float-right"
                        type="text"
                        placeholder="Search"
                        onChange={this.search}
                    />
                </div>
                <div class="em_box em_top_members">
                    {this.state.users.map((user) => {
                        return (
                            <a
                                key={user.user_id}
                                href={'/admin/login_as?user_id=' + user.user_id}
                                class="user_row marginbottom20"
                            >
                                <div class="name">
                                    <div class="wrapper">{user.display_name}</div>
                                    <div class="wrapper">#{user.user_id}</div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    }
}

Util.try_render('react_users', Users);

export default Users;
