import React from 'react';
import axios from 'axios';
import Quill from 'quill';

import Util from 'js/util';

class ManageChallenge extends React.Component {
    constructor(props) {
        super(props);

        this.state = props.challenge;
        this.state = {
            ...props.challenge,
            mode: props.mode,
            challenge_id: this.state.mode === 'create' ? -1 : this.state.challenge_id,
            editing_test: {},  // The test being edited (to show edit section)
            current_test_id: -1,  // IDs for newly created tests
            deleted_tests: [],  // IDs of deleted tests
        }

        this.handle_change = this.handle_change.bind(this);
        this.manage_test = this.manage_test.bind(this);
        this.save_test = this.save_test.bind(this);
        this.delete_test = this.delete_test.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        let Inline = Quill.import('blots/inline');

        class Badge extends Inline { }
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
                    [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }],
                    ['blockquote', 'code-block', 'link'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
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

        if (this.state.mode === 'update') {
            quill.clipboard.dangerouslyPasteHTML(this.state.html);
        }
    }

    handle_change(e) {
        let id = e.target.id;
        let value = e.target.value;

        // Handles changes in challenge data
        if (id.indexOf('test-') == -1) {
            return this.setState({
                [id]: value
            });
        }

        // Handles changes in tests data
        let { challenge_test_id, challenge_id, official, name, input, output } = this.state.editing_test;

        return this.setState({
            editing_test: {
                challenge_test_id: challenge_test_id,
                challenge_id: challenge_id,
                official: official,
                name: name,
                input: input,
                output: output,
                [id.replace('test-', '')]: value
            }
        });
    }

    async save() {
        // Create/update challenge
        let url = this.state.mode === 'create'
            ? '/admin/challenges/create'
            : '/admin/challenges/update/' + this.state.challenge_id;

        let res = await axios.post(url, {
            difficulty: this.state.difficulty,
            points: this.state.points,
            folder: 'N/A',
            name: this.state.name,
            description: this.state.description,
            html: this.state.html
        });

        if (res.status === 400) {
            return bootbox.alert('An error has occured.');
        }

        // Create/update tests
        let valid = true;
        for (let test of this.state.tests) {
            test.challenge_id = this.state.mode === 'create' ? res.data.challenge_id : test.challenge_id;
            let test_url = test.challenge_test_id < 0 ? '/admin/tests/create'
                : '/admin/tests/update/' + test.challenge_test_id;
            let test_res = await axios.post(test_url, test);
            if (test_res === 400) {
                valid = false;
            }
        }
        if (!valid) {
            bootbox.alert('An error has occured while saving one or more tests');
        }

        // Delete tests
        for (const id of this.state.deleted_tests) {
            await axios.post('/admin/tests/delete/' + id);
        }

        location = '/admin/challenges';
    }

    manage_test(test_to_manage) {
        this.setState({
            editing_test: this.state.editing_test.challenge_test_id ? {} : test_to_manage
        });
    }

    async delete_test(id_to_delete) {
        bootbox.confirm({
            message: 'Are you sure you want to delete this test?',
            buttons: {
                confirm: {
                    label: 'Delete',
                    className: 'btn-danger'
                },
                cancel: {
                    label: 'Cancel',
                    className: 'btn-secondary'
                }
            },
            callback: async result => {
                if (!result) {
                    return;
                }

                let current_tests = this.state.tests;

                let test_to_delete = current_tests.find(test => test.challenge_test_id === id_to_delete);
                current_tests.splice(current_tests.indexOf(test_to_delete), 1);

                let current_deleted_tests = this.state.deleted_tests;
                current_deleted_tests.push(id_to_delete);

                this.setState({
                    tests: current_tests,
                    deleted_tests: current_deleted_tests
                });
            }
        });
    }

    async save_test() {
        let current_tests = this.state.tests;
        let editing_test = this.state.editing_test
        if (
            !editing_test.name ||
            !editing_test.input ||
            !editing_test.output
        ) {
            return bootbox.alert('Please provide all data.');
        }
        let inputs_arr = editing_test.input.split('\n');
        if (
            inputs_arr.length !== editing_test.output.split('\n').length
        ) {
            return bootbox.alert('The number of inputs do not match the number of outputs.');
        }
        let arguments_number = inputs_arr[0].split('|').length;
        let valid = true;
        inputs_arr.forEach(input => {
            if (input.split('|').length !== arguments_number) {
                valid = false;
            }
        });
        if (!valid) {
            return bootbox.alert('Number of arguments do not match in inputs.')
        }
        // Handles newly created tests
        if (editing_test.challenge_test_id === this.state.current_test_id) {
            console.log('here');
            current_tests.push(editing_test);
            let new_test_id = this.state.current_test_id - 1;
            return this.setState({
                tests: current_tests,
                editing_test: {},
                current_test_id: new_test_id
            });
        }

        // Handles edited tests
        let test_to_edit = current_tests.find(
            test => test.challenge_test_id === editing_test.challenge_test_id
        );
        current_tests.splice(current_tests.indexOf(test_to_edit), 1, editing_test);
        return this.setState({
            tests: current_tests,
            editing_test: {}
        });

    }

    render() {
        return (
            <div class="em_challenge_manage marginbottom20">
                <h4 class="f300">Manage Challenge</h4>

                {
                    this.state.html.indexOf('em_challenge_abstract"') !== -1 && (
                        <div class="alert alert-danger">
                            Editing is not supported for this challenge unless reformatted.
                        </div>
                    )
                }
                <div class="form-group">
                    <label>Name
                    <input
                        type="text"
                        id="name"
                        class="form-control"
                        value={this.state.name}
                        onChange={this.handle_change} />
                    </label>
                </div>

                <div class="form-group">
                    <label>Difficulty (1: easy, 2: medium, 3: hard)
                    <input
                        type="text"
                        id="difficulty"
                        class="form-control"
                        value={this.state.difficulty}
                        onChange={this.handle_change} />
                    </label>
                </div>

                <div class="form-group">
                    <label>Points (the standard is easy: 10, medium: 30, hard: 50)
                    <input
                        type="text"
                        id="points"
                        class="form-control"
                        value={this.state.points}
                        onChange={this.handle_change} />
                    </label>
                </div>

                <div class="form-group">
                    <label>Brief description</label>

                    <input
                        type="text"
                        id="description"
                        class="form-control"
                        value={this.state.description}
                        onChange={this.handle_change} />
                </div>

                <div class="form-group">
                    <label>Challenge explanation</label>
                    <div id="html"></div>
                </div>
                <div class='form-group'>
                    <h4 class="f300">
                        Test Cases
                        <small>
                            <a class="pointer" onClick={() => this.manage_test({
                                challenge_test_id: this.state.current_test_id,
                                challenge_id: this.state.challenge_id,
                                official: false,
                                name: '',
                                input: '',
                                output: ''
                            })}>
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
                                    onChange={this.handle_change} />
                            </div>
                            <div class="form-group">
                                <label>
                                    Inputs (each test case separated by a new line, arguments separated by '|')
                                </label>
                                <textarea
                                    rows="5"
                                    id="test-input"
                                    class="form-control"
                                    value={this.state.editing_test.input}
                                    onChange={this.handle_change}></textarea>
                            </div>
                            <div class="form-group">
                                <label>Corresponding outputs (each separated by a new line)</label>
                                <textarea
                                    rows="5"
                                    id="test-output"
                                    class="form-control"
                                    value={this.state.editing_test.output}
                                    onChange={this.handle_change}></textarea>
                            </div>
                            <button class="btn btn-success btn-sm" onClick={this.save_test}>
                                Save test
                            </button>
                        </div>
                    )}
                    <table id="challenges-table" class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th style={{ 'width': '80px' }}></th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!this.state.tests.length && this.state.tests.map(test => {
                                return (
                                    <tr key={test.challenge_test_id}>
                                        <td class="actions">
                                            <a
                                                href="#"
                                                onClick={() => this.manage_test(test)}
                                            >
                                                <i class="fa fa-pen"></i>
                                            </a>
                                            {' '}
                                            <a
                                                href="#"
                                                onClick={() => this.delete_test(test.challenge_test_id)}
                                            >
                                                <i class="fa fa-trash text-danger"></i>
                                            </a>
                                        </td>
                                        <td>{test.name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <button type="button" class="btn btn-success" onClick={this.save}>Save challenge</button>
            </div>
        )
    }
}

Util.try_render('react_manage_challenge', ManageChallenge);

export default ManageChallenge;
