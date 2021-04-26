import React from 'react';
import axios from 'axios';

import Util from 'js/util';

class PistonPackageManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            packages: [],
            message: props.message
        };
    }

    async componentDidMount() {
        let { data: packages } = await axios.get('/admin/piston/packages');

        this.setState({
            packages
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                <table class="table table-sm table-dark">
                    <tr>
                        <th style={{ width: '100px' }}></th>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Installed</th>
                    </tr>
                    {this.state.packages.map(pkg => {
                        return (
                            <tr>
                                <td>
                                    {pkg.installed && (
                                        <a
                                            key={pkg.language + '-' + pkg.language_version}
                                            href={`/admin/piston/uninstall?language=${pkg.language}&version=${pkg.language_version}`}
                                            class="user_row marginbottom20">
                                            Uninstall
                                        </a>
                                    ) || (
                                        <a
                                            key={pkg.language + '-' + pkg.language_version}
                                            href={`/admin/piston/install?language=${pkg.language}&version=${pkg.language_version}`}
                                            class="user_row marginbottom20">
                                            Install
                                        </a>
                                    )}
                                </td>
                                <td>{pkg.language}</td>
                                <td>{pkg.language_version}</td>
                                <td>{pkg.installed ? 'Yes': 'No'}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }

}

Util.try_render('react_ppman', PistonPackageManager);

export default PistonPackageManager;
