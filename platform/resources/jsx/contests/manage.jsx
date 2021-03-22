import React from 'react';
import axios from 'axios';
import Quill from 'quill';

import Util from 'js/util';

class Manage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props.contest,
            filtered_languages: []
        };
        this.all_languages = []
        this.handle_change = this.handle_change.bind(this);
        this.save = this.save.bind(this);
        this.handle_language_change = this.handle_language_change.bind(this);
        this.select = this.select.bind(this);
        this.get_defaults = this.get_defaults.bind(this);
        this.search_languages = this.search_languages.bind(this);
        this.no_golf_no_disallowed = this.no_golf_no_disallowed.bind(this);
    }

    async componentDidMount() {
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
        let disallowed_languages = !!this.state.disallowed_languages
            ? this.state.disallowed_languages.split(',') : [];
        this.all_languages = await axios.get('/api/v1/piston/versions');
        this.all_languages = this.all_languages.data.map(lang => lang.name);
        let filtered_languages = this.all_languages
        this.setState({
            disallowed_languages,
            filtered_languages
        });
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

    handle_language_change(e) {
        let lang_name = e.target.id.replace('allow-', '');
        let disallowed_languages = this.state.disallowed_languages;
        if (!e.target.checked) {
            disallowed_languages.push(lang_name);
        }
        else {
            disallowed_languages.splice(disallowed_languages.indexOf(lang_name), 1);
        }
        this.setState({
            disallowed_languages
        });
    }

    select(is_select_all) {
        let disallowed_languages = is_select_all
            ? []
            : this.all_languages.filter(lang => !this.state.disallowed_languages.includes(lang));
        this.setState({
            disallowed_languages
        });
    }

    search_languages(e) {
        let search_term = e.target.value;
        let filtered_languages = this.all_languages.filter(lang => lang.includes(search_term));
        this.setState({
            filtered_languages
        });
    }

    async get_defaults(e) {
        let type = e.target.id;
        let default_languages = await axios.get('/contests/default/' + type);
        let disallowed_languages = default_languages.data;
        if (type !== 'disallowed') {
            disallowed_languages = this.all_languages.filter(
                lang => !disallowed_languages.includes(lang)
            ); // Invert
        }
        return this.setState({
            disallowed_languages
        });
    }

    async no_golf_no_disallowed() {
        let disallowed_languages = await axios.get('/contests/default/disallowed');
        disallowed_languages = disallowed_languages.data;
        let golf_languages = await axios.get('/contests/default/golf');
        golf_languages = golf_languages.data;
        this.setState({
            disallowed_languages: golf_languages.concat(disallowed_languages)
        });
    }

    async save() {
        let { draft, name, start_date, end_date, input, output, disallowed_languages } = this.state;
        const description = JSON.stringify(this.quill.getContents());

        let test_cases = input.split('\n');

        if (test_cases.length !== output.split('\n').length) {
            return bootbox.alert("The number of test cases do not match the number of expected results");
        }

        let number_of_parameters = test_cases[0].split('|').length;
        let valid = true

        test_cases.forEach(test_case => {
            if (test_case.split('|').length !== number_of_parameters) {
                valid = false
            }
        });

        if (!valid) {
            return bootbox.alert("Two or more test cases have a different number of parameters (inputs)")
        }

        let url;

        if (this.props.mode === 'create') {
            url = '/admin/contests/create';
        }

        if (this.props.mode === 'update') {
            url = '/admin/contests/update/' + this.props.contest_id;
        }
        disallowed_languages = disallowed_languages.join(',');
        let res = await axios
            .post(url, {
                draft,
                name,
                description,
                start_date,
                end_date,
                input,
                output,
                disallowed_languages
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
                        <label>
                            Input(s) (Each test case on a new line, multiple inputs are separated by |)
                        </label>
                        <textarea
                            id="input"
                            class="form-control"
                            rows="4"
                            value={this.state.input}
                            onChange={this.handle_change}
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <label>Output(s) (Each test case result on a new line)</label>
                        <textarea
                            id="output"
                            class="form-control"
                            rows="4"
                            value={this.state.output}
                            onChange={this.handle_change}
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <label>Allowed languages</label>

                        <div class="row">
                            <div class="em_box col-4">
                                {this.state.filtered_languages.map(lang => {
                                    return (
                                        <div key={'allow-' + lang}>
                                            <input
                                                type="checkbox"
                                                id={'allow-' + lang}
                                                checked={!this.state.disallowed_languages.includes(lang)}
                                                onChange={this.handle_language_change} /> {lang}
                                        </div>
                                    );
                                })}
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={this.search_languages} />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-2">
                                <button
                                type="button"
                                class="btn btn-sm btn-secondary control_button"
                                onClick={() => this.select(true)}>Select all</button>
                            </div>
                            <div class="col-2">
                                <button
                                type="button"
                                class="btn btn-sm btn-secondary control_button float-right"
                                onClick={() => this.select(false)}>Invert selection</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-2">
                                <button
                                type="button"
                                id="disallowed"
                                class="btn btn-sm btn-secondary control_button"
                                onClick={this.get_defaults}>Default disallowed</button>
                            </div>
                            <div class="col-2">
                                <button
                                type="button"
                                id="golf"
                                class="btn btn-sm btn-secondary control_button float-right"
                                onClick={this.get_defaults}>Default golf</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-2">
                            <button
                                    type="button"
                                    class="btn btn-sm btn-secondary control_button"
                                    onClick={this.no_golf_no_disallowed}>No golf, no disallowed</button>
                            </div>
                        </div>
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
