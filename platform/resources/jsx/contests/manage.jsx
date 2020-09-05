import React from 'react';
import axios from 'axios';
import Quill from 'quill';

import Util from 'js/util';

class Manage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            draft: 1,
            name: '',
            description: '',
            start_date: '',
            end_date: '',
            input: '',
            output: ''
        };

        if (props.mode === 'update') {
            this.state = props.contest;
        }

        this.handle_change = this.handle_change.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.quill = new Quill('#description', {
            theme: 'snow',
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

        if (this.props.mode === 'update') {
            this.quill.setContents(JSON.parse(this.state.description));
        }
    }

    handle_change(e) {
        let id = e.target.id;
        let value = e.target.value;

        if (id === 'draft') {
            value = this.state.draft ? 0 : 1;
        }

        this.setState({
            [id]: value
        });
    }

    async save() {
        const { draft, name, start_date, end_date, input, output } = this.state;
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
                draft,
                name,
                description,
                start_date,
                end_date,
                input,
                output
            });

        location = '/admin/contests';
    }

    render() {
        return (
            <div class="em_contest_manage">
                <div class="col_padding">
                    <div class="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            id="name"
                            class="form-control"
                            value={this.state.name}
                            onChange={this.handle_change} />
                    </div>

                    <div class="form-group">
                        <div class="checkbox">
                            <input
                                type="checkbox"
                                id="draft"
                                checked={this.state.draft}
                                onChange={this.handle_change} /> Draft
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <div id="description"></div>
                    </div>

                    <div class="form-group">
                        <label>Start Date</label>
                        <input
                            type="text"
                            id="start_date"
                            class="form-control"
                            value={this.state.start_date}
                            onChange={this.handle_change} />
                    </div>

                    <div class="form-group">
                        <label>End Date</label>
                        <input
                            type="text"
                            id="end_date"
                            class="form-control"
                            value={this.state.end_date}
                            onChange={this.handle_change} />
                    </div>

                    <div class="form-group">
                        <label>Input(s) (separated by \n)</label>
                        <textarea
                            id="input"
                            class="form-control"
                            rows="4"
                            value={this.state.input}
                            onChange={this.handle_change}
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <label>Output</label>
                        <textarea
                            id="output"
                            class="form-control"
                            rows="4"
                            value={this.state.output}
                            onChange={this.handle_change}
                        ></textarea>
                    </div>

                    <button
                        type="button"
                        class="btn btn-sm btn-success"
                        onClick={this.save}>Save</button>
                </div>
            </div>
        );
    }

}

Util.try_render('react_contest_manage', Manage);

export default Manage;
