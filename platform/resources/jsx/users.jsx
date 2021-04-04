import React from 'react';
import axios from 'axios';
import moment from 'moment';

import Util from 'js/util';

class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: props.users
        };
    }

    search = e => {
        let users = this.props.users
            .filter(user => user.display_name.toLowerCase().includes(e.target.value.toLowerCase()));

        this.setState({
            users,
        });
    }

    render() {
        return (
            <div>
                <input
                    class="form-control"
                    type="text"
                    placeholder="Search"
                    onChange={this.search} />
                <table class="table table-sm table-dark">
                    <tr>
                        <th style={{ width: '100px' }}></th>
                        <th style={{ width: '100px' }}>User ID</th>
                        <th>Username</th>
                        <th>Display Name</th>
                        <th>Registered</th>
                    </tr>
                    {this.state.users.map(user => {
                        return (
                            <tr>
                                <td>
                                    <a
                                        key={user.user_id}
                                        href={'/admin/users/login_as?user_id=' + user.user_id}
                                        class="user_row marginbottom20">
                                        Login As
                                    </a>
                                </td>
                                <td>{user.user_id}</td>
                                <td>{user.username}</td>
                                <td>{user.display_name}</td>
                                <td>{moment(user.created_at).format('MMMM Do, YYYY')}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }

}

Util.try_render('react_users', Users);

export default Users;
