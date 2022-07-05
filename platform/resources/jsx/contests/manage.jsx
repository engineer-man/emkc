import React from 'react';
import axios from 'axios';
import Quill from 'quill';

import Util from 'js/util';

class Manage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.contest,
            languages: []
        };
    }

    async componentDidMount() {
        this.quill = new Quill('#description', {
            theme: 'snow',
            modules: {
                syntax: true,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block', 'link'],
                    [{ header: 1 }, { header: 2 }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean']
                ]
            }
        });

        if (this.props.mode === 'update') {
            this.quill.setContents(JSON.parse(this.state.description));
        }

        let disallowed_languages = this.state.disallowed_languages
            ? this.state.disallowed_languages.split(',')
            : [];

        let { data: languages } = await axios.get('/api/v2/piston/runtimes');

        languages = languages
            .sort((a, b) => (a.language < b.language ? -1 : 1))
            .reduce((a, c) => {
                c.enabled = !disallowed_languages.includes(c.language);

                if (a.find((l) => l.language === c.language)) {
                    return a;
                }

                let tmp = languages
                    .filter((language) => language.language === c.language)
                    .sort((a, b) => (a.version > b.version ? -1 : 1));

                a.push(tmp[0]);

                return a;
            }, []);

        this.setState({
            disallowed_languages,
            languages
        });
    }

    handle_change = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        this.setState({
            [id]: value
        });
    };

    handle_language_change = (e) => {
        e.persist();

        let name = e.target.id;

        this.setState((prev) => {
            const languages = prev.languages.map((language) => {
                if (language.language === name) {
                    language.enabled = e.target.checked;
                }

                return language;
            });

            return {
                languages
            };
        });
    };

    select = (all) => {
        this.setState((prev) => {
            const languages = prev.languages.map((language) => {
                language.enabled = all ? true : !language.enabled;

                return language;
            });

            return {
                languages
            };
        });
    };

    save = async () => {
        let {
            name,
            start_date,
            end_date,
            input,
            output,
            disallowed_languages
        } = this.state;

        const description = JSON.stringify(this.quill.getContents());

        if (!Util.are_test_cases_valid({ input, output })) {
            return bootbox.alert(
                'The number of test cases do not match the number of expected results'
            );
        }

        const url =
            this.props.mode === 'update'
                ? '/admin/contests/update/' + this.props.contest_id
                : '/admin/contests/create';

        disallowed_languages = this.state.languages
            .filter((language) => !language.enabled)
            .map((language) => language.language)
            .concat(this.props.languages.disallowed_languages)
            .join(',');

        const res = await axios.post(url, {
            name,
            description,
            start_date,
            end_date,
            input,
            output,
            disallowed_languages
        });

        if (res.status === 400) {
            return bootbox.alert(res.data.message);
        }

        if (res.status >= 400) {
            return bootbox.alert('An error has occurred');
        }

        location = '/admin/contests';
    };

    render() {
        return (
            <div class="em_contest_manage">
                <div class="wrapper">
                    <div class="left">
                        <div class="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                id="name"
                                class="form-control"
                                value={this.state.name}
                                onChange={this.handle_change}
                            />
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
                                onChange={this.handle_change}
                            />
                        </div>

                        <div class="form-group">
                            <label>End Date</label>
                            <input
                                type="text"
                                id="end_date"
                                class="form-control"
                                value={this.state.end_date}
                                onChange={this.handle_change}
                            />
                        </div>

                        <div class="form-group">
                            <label>
                                Input(s) (Each test case on a new line, multiple
                                inputs are separated by |)
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
                            <label>
                                Output(s) (Each test case result on a new line)
                            </label>
                            <textarea
                                id="output"
                                class="form-control"
                                rows="4"
                                value={this.state.output}
                                onChange={this.handle_change}
                            ></textarea>
                        </div>

                        <div class="form-group">
                            <button
                                type="button"
                                class="btn btn-sm btn-success"
                                onClick={this.save}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div class="right">
                        <div class="form-group">
                            <label>Allowed languages</label>

                            <div>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-secondary"
                                    onClick={() => this.select(true)}
                                >
                                    All
                                </button>{' '}
                                <button
                                    type="button"
                                    class="btn btn-sm btn-secondary"
                                    onClick={() => this.select(false)}
                                >
                                    Invert
                                </button>
                            </div>

                            {this.state.languages.map((lang) => {
                                return (
                                    <div key={lang.language}>
                                        <input
                                            type="checkbox"
                                            id={lang.language}
                                            checked={lang.enabled}
                                            onChange={
                                                this.handle_language_change
                                            }
                                        />{' '}
                                        {lang.language} (
                                        {lang.runtime
                                            ? `via ${lang.runtime} `
                                            : ''}
                                        {lang.version})
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Util.try_render('react_contest_manage', Manage);

export default Manage;
