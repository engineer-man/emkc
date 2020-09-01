import React from 'react';
import axios from 'axios';

import Util from 'js/util';

class Manage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };
    }

    componentDidMount() {
        this.quill = new Quill('#description', {
            theme: 'snow',
            placeholder: 'Description here',
            modules: {
                syntax: true,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block', 'link'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            }
        });

        if (this.props.description) {
            this.quill.setContents(this.props.description);
        }
    }

    save() {
        const { title } = this.state;
        const description = JSON.stringify(this.quill.getContents());

        let url;

        if (this.props.mode === 'create') {
            url = '/admin/contests/create';
        }

        if (this.props.mode === 'update') {
            url = '/admin/contests/update/' + this.props.contest_id;
        }

        let res = await axios
            .post(url, {
                title,
                description
            });
    }

    render() {
        return (
            <div class="em_contest_manage">
                <div class="contents">
                    <div class="col_padding">
                        <h5 class="f700">Title</h5>
                        <input
                            type="text"
                            id="title"
                            class="title"
                            placeholder="Contest title"
                            value={this.state.title}
                            onChange={this.update} />

                        <h5 class="f700">Description</h5>
                        <div class="form-group">
                            <div id="description"></div>
                        </div>

                        <button type="button" class="btn btn-sm btn-success" onClick={this.save}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

}

Util.try_render('react_contest_manage', Manage);

export default Manage;
