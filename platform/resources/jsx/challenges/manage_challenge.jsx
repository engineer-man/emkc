import React from 'react';
import axios from 'axios';
import Quill from 'quill';

import Util from 'js/util';

class ManageChallenge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.challenge,
            challenge_id:
                this.props.mode === 'create'
                    ? -1
                    : this.props.challenge.challenge_id,
            editing_test: {} // The test being edited (to show edit section)
        };

        this.handle_change = this.handle_change.bind(this);
        this.manage_test = this.manage_test.bind(this);
        this.save_test = this.save_test.bind(this);
        this.delete_test = this.delete_test.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        let Inline = Quill.import('blots/inline');

        class Badge extends Inline {}
        Badge.blotName = 'badge';
        Badge.tagName = 'span';
        Badge.className = 'value-badge';
        Badge.formats = () => true;

        Quill.register(Badge);

        let quill = new Quill('#html', {
            theme: 'snow',
            modules: {
                syntax: false,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [
                        { header: 1 },
                        { header: 2 },
                        { header: 3 },
                        { header: 4 }
                    ],
                    ['blockquote', 'code-block', 'link'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    //['badge'],
                    ['clean']
                ]
            }
        });

        quill.on('text-change', () => {
            this.setState({
                html: quill.root.innerHTML
            });
        });

        if (this.props.mode === 'update') {
            quill.clipboard.dangerouslyPasteHTML(this.state.html);
        }
    }

    handle_change(e) {
        let id = e.target.id;
        let value = e.target.value;

        // Handles changes in challenge data
        if (id.indexOf('test-') === -1) {
            if (id === 'draft') {
                value = this.state.draft ? 0 : 1;
            }

            return this.setState({
                [id]: value
            });
        }

        // Handles changes in tests data
        const editing_test = this.state.editing_test;
        editing_test[id.replace('test-', '')] = value;

        return this.setState({ editing_test });
    }

    async save() {
        if (this.state.tests.length === 0) {
            return bootbox.alert('Please add at least one test.');
        }

        let url =
            this.props.mode === 'create'
                ? '/admin/challenges/create'
                : '/admin/challenges/update/' + this.state.challenge_id;

        let res = await axios.post(url, {
            draft: this.state.draft,
            difficulty: this.state.difficulty,
            points: this.state.points,
            name: this.state.name,
            description: this.state.description,
            html: this.state.html,
            tests: this.state.tests
        });

        if (res.status >= 400) {
            return bootbox.alert('An error has occurred');
        }

        location = '/admin/challenges';
    }

    manage_test(editing_test) {
        this.setState({ editing_test });
    }

    async delete_test(index_to_delete) {
        let current_tests = this.state.tests;
        current_tests.splice(index_to_delete, 1);
        this.setState({ tests: current_tests, editing_test: {} });
    }

    async save_test() {
        let current_tests = this.state.tests;
        let editing_test = this.state.editing_test;

        if (!editing_test.name || !editing_test.input || !editing_test.output) {
            return bootbox.alert('Please provide all data.');
        }

        if (!Util.are_test_cases_valid(editing_test)) {
            return bootbox.alert(
                'The number of inputs do not match the number of outputs.'
            );
        }

        if (editing_test.index === -1) {
            current_tests.push(editing_test);

            return this.setState({
                tests: current_tests,
                editing_test: {}
            });
        }

        let test_to_edit = current_tests[editing_test.index];

        current_tests.splice(
            current_tests.indexOf(test_to_edit),
            1,
            editing_test
        );

        return this.setState({
            tests: current_tests,
            editing_test: {}
        });
    }

    render() {
        return (
            <div class="em_challenge_manage marginbottom20">
                <h4 class="f300">Manage Challenge</h4>

                {this.state.html.indexOf('em_challenge_abstract"') !== -1 && (
                    <div class="alert alert-danger">
                        Editing is not supported for this challenge unless
                        reformatted.
                    </div>
                )}
                <div class="form-group">
                    <label>
                        Name
                        <input
                            type="text"
                            id="name"
                            class="form-control"
                            value={this.state.name}
                            onChange={this.handle_change}
                        />
                    </label>
                </div>

                <div class="form-group">
                    <div class="checkbox">
                        <input
                            type="checkbox"
                            id="draft"
                            checked={this.state.draft}
                            onChange={this.handle_change}
                        />{' '}
                        Draft
                    </div>
                </div>

                <div class="form-group">
                    <label>
                        Difficulty
                        <select
                            type="text"
                            id="difficulty"
                            class="form-control"
                            value={this.state.difficulty}
                            onChange={this.handle_change}
                        >
                            <option value="1">Easy</option>
                            <option value="2">Medium</option>
                            <option value="3">Hard</option>
                        </select>
                    </label>
                </div>

                <div class="form-group">
                    <label>
                        Points (the standard is: easy: 10, medium: 30, hard: 50)
                        <input
                            type="text"
                            id="points"
                            class="form-control"
                            value={this.state.points}
                            onChange={this.handle_change}
                        />
                    </label>
                </div>

                <div class="form-group">
                    <label>Brief description</label>

                    <input
                        type="text"
                        id="description"
                        class="form-control"
                        value={this.state.description}
                        onChange={this.handle_change}
                    />
                </div>

                <div class="form-group">
                    <label>Challenge explanation</label>
                    <div id="html"></div>
                </div>
                <div class="form-group">
                    <h4 class="f300">
                        Test Cases
                        <small>
                            <a
                                class="pointer"
                                onClick={() =>
                                    this.manage_test({
                                        challenge_id: this.state.challenge_id,
                                        official: false,
                                        name: '',
                                        input: '',
                                        output: '',
                                        index: -1
                                    })
                                }
                            >
                                {' '}
                                <i class="fa fa-plus green"></i>
                            </a>
                        </small>
                    </h4>
                    {Object.keys(this.state.editing_test).length > 0 && (
                        <div class="case_box">
                            <div class="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    id="test-name"
                                    class="form-control"
                                    value={this.state.editing_test.name}
                                    onChange={this.handle_change}
                                />
                            </div>
                            <div class="form-group">
                                <label>
                                    Inputs (each test case separated by a new
                                    line, arguments separated by '|')
                                </label>
                                <textarea
                                    rows="5"
                                    id="test-input"
                                    class="form-control"
                                    value={this.state.editing_test.input}
                                    onChange={this.handle_change}
                                ></textarea>
                            </div>
                            <div class="form-group">
                                <label>
                                    Corresponding outputs (each separated by a
                                    new line)
                                </label>
                                <textarea
                                    rows="5"
                                    id="test-output"
                                    class="form-control"
                                    value={this.state.editing_test.output}
                                    onChange={this.handle_change}
                                ></textarea>
                            </div>
                            <button
                                class="btn btn-success btn-sm"
                                onClick={this.save_test}
                            >
                                Save test
                            </button>
                        </div>
                    )}
                    <table
                        id="challenges-table"
                        class="table table-striped table-sm"
                    >
                        <thead>
                            <tr>
                                <th style={{ width: '80px' }}></th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!this.state.tests.length &&
                                this.state.tests.map((test, index) => {
                                    test.index = index;
                                    return (
                                        <tr key={index}>
                                            <td class="actions">
                                                <a
                                                    onClick={() =>
                                                        this.manage_test(test)
                                                    }
                                                >
                                                    <i class="fa fa-pen green pointer"></i>
                                                </a>{' '}
                                                <a
                                                    onClick={() =>
                                                        this.delete_test(index)
                                                    }
                                                >
                                                    <i class="fa fa-trash text-danger pointer"></i>
                                                </a>
                                            </td>
                                            <td>{test.name}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>

                <button
                    type="button"
                    class="btn btn-success"
                    onClick={this.save}
                >
                    Save challenge
                </button>
            </div>
        );
    }
}

Util.try_render('react_manage_challenge', ManageChallenge);

export default ManageChallenge;
