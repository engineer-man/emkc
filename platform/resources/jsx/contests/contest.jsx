import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Quill from 'quill';

import Util from 'js/util';

class Contest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contest: props.contest,
            language: '',
            solution: '',
            languages: [],
            passed: true
        };

        if (props.submission) {
            this.state.language = props.submission.language;
            this.state.solution = props.submission.solution;
        }

        this.handle_change = this.handle_change.bind(this);
        this.submit = this.submit.bind(this);
    }

    async componentDidMount() {
        $('.ql-syntax').each(function(i, block) {
            hljs.highlightBlock(block);
        });

        let languages = await axios.get('/api/v1/piston/versions');

        this.setState({
            languages: languages.data,
            language: this.state.language || languages.data[0].name
        });
    }

    handle_change(e) {
        let id = e.target.id;
        let value = e.target.value;

        this.setState({
            [id]: value
        });
    }

    ops_to_html(ops) {
        try {
            ops = JSON.parse(ops).ops;
            var tmp = document.createElement('div');
            (new Quill(tmp, {modules:{syntax: true}})).setContents(ops);
            return tmp.getElementsByClassName('ql-editor')[0].innerHTML;
        } catch (e) {
            return '';
        }
    }

    async submit() {
        this.setState({
            passed: true
        });

        const { contest_id, language, solution } = this.state;

        let result = await axios
            .post('/contests/submit', {
                contest_id: this.state.contest.contest_id,
                language,
                solution
            });

        if (result.data.passed) {
            return bootbox
                .alert('Your solution succeeded and has been recorded/updated.', () => {
                    location = location;
                });
        }

        this.setState({
            passed: false
        });
    }

    render() {
        return (
            <div class="em_contests_contest">
                <h4 class="header f300 marginbottom20">{this.state.contest.name}</h4>

                <div class="ql-snow marginbottom20">
                    <div
                        class="ql-editor"
                        dangerouslySetInnerHTML={{ __html: this.ops_to_html(this.state.contest.description)}}>
                    </div>
                </div>

                <h5>Your Submission</h5>
                <div class="marginbottom20">
                    {ctx.user_id && this.state.contest.active && (
                        <div>
                            <p>
                                It's recommended that you compose your solution separately and just paste
                                here once you're ready. After clicking "Submit Solution" your solution will be
                                tested with secret inputs. If successful, your solution will be saved. Be sure
                                to choose the correct language.
                            </p>
                            <div class="form-group">
                                <label>Language</label>
                                <select
                                    id="language"
                                    class="form-control"
                                    style={{ width: '200px'}}
                                    value={this.state.language}
                                    onChange={this.handle_change}>
                                    {this.state.languages.map(language => {
                                        return (
                                            <option
                                                key={language.name}
                                                value={language.name}>{language.name} ({language.version})</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Solution</label>
                                <textarea
                                    id="solution"
                                    rows="6"
                                    class="form-control"
                                    value={this.state.solution}
                                    onChange={this.handle_change}
                                ></textarea>
                            </div>
                            <div class="form-group">
                                <button
                                    type="button"
                                    class="btn btn-sm btn-success"
                                    onClick={this.submit}>Submit Solution</button>
                                {' '}
                                {!this.state.passed && (
                                    <span class="text-danger">Sorry, your solution does not satisfy the requirements</span>
                                )}
                            </div>
                        </div>
                    ) || (
                        ctx.user_id && (
                            <div>
                                This contest is not active so no submissions can be submitted.
                            </div>
                        ) || (
                            <div>
                                You are not logged in. To submit a solution, click the Login button at the top right.
                            </div>
                        )
                    )}
                </div>

                <h5>Submissions</h5>
                {this.state.contest.submissions.map(submission => {
                    return (
                        <div key={submission.contest_submission_id} class="submission">
                            <div class="main">
                                <div class="summary">
                                    {submission.length} characters with {submission.language}
                                </div>
                                <div class="time">
                                    Submitted: {moment(submission.created_at).format('MMMM D, YYYY @ h:mm:ss a')}
                                </div>
                            </div>
                            <div class="user">
                                <img src={ctx.cdn_url + submission.user.avatar_url} />
                                {' '}
                                {submission.user.username}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

}

Util.try_render('react_contest_contest', Contest);

export default Contest;
