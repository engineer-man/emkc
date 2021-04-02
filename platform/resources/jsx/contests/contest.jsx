import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Quill from 'quill';

import Util from 'js/util';
import { contest } from '../../../api/controllers/ContestsController';

class Contest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contest: props.contest,
            language: '',
            solution: '',
            explanation: '',
            languages: [],
            passed: true,
            validating: false,
            submitting: false,
            shown_explanation: -1, // ID of the submission that an explanation is being shown for
            shown_submissions: [],
            showing_late: false
        };

        this.on_time_submissions = [];
        this.late_submissions = [];

        if (props.submissions && props.submissions.length > 0) {
            let submission = props.submissions
                .sort((a,b) => a.length > b.length ? 1 : -1)[0];

            this.state.language = submission.language;
            this.state.solution = submission.solution;
            this.state.explanation = submission.explanation;
        }

        if (this.state.contest.submissions.length > 0) {
            this.on_time_submissions = this.state.contest.submissions.filter(submission => !submission.late);
            this.late_submissions = this.state.contest.submissions.filter(submission => submission.late);
        }

        this.handle_change = this.handle_change.bind(this);
        this.submit = this.submit.bind(this);
        this.validate = this.validate.bind(this);
        this.change_shown_explanation = this.change_shown_explanation.bind(this);
        this.highlight_blocks = this.highlight_blocks.bind(this);
    }

    highlight_blocks() {
        $('.ql-syntax').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }

    async componentDidMount() {
        this.highlight_blocks();

        this.quill = null;
        if (ctx.user_id) {
            this.quill = new Quill('#explanation', {
                theme: 'snow',
                modules: {
                    syntax: true,
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['code-block', 'link'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['clean']
                    ]
                }
            });

            this.quill.clipboard.dangerouslyPasteHTML(this.state.explanation);
        }

        let languages = await axios.get('/api/v1/piston/versions');
        let disallowed_languages = await axios.get('/contests/disallowed_languages');

        disallowed_languages = disallowed_languages.data;
        languages = languages.data.filter(lang => !disallowed_languages.includes(lang.name));

        this.setState({
            languages,
            language: this.state.language || languages[0].name,
            shown_submissions: this.on_time_submissions
        });
    }

    handle_change(e) {
        let id = e.target.id;
        let value = e.target.value;

        if (id === 'language') {
            let submission = this.props.submissions
                .find(submission => submission.language === value
                    && submission.late === !this.state.contest.active);
            let explanation = submission ? submission.explanation : '';
            this.quill.clipboard.dangerouslyPasteHTML(explanation);

            this.setState({
                solution: submission ? submission.solution : '',
                explanation
            });
        }

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

    change_shown_explanation(e) {
        let submission_id = parseInt(e.target.id);
        if (this.state.shown_explanation !== submission_id) {
            return this.setState({
                shown_explanation: submission_id
            }, this.highlight_blocks);
        }
        return this.setState({
            shown_explanation: -1
        }, this.highlight_blocks);
    }

    async submit() {
        this.setState({
            passed: true
        });

        const { language, solution } = this.state;
        const explanation = this.quill.getText().length > 1 ? this.quill.root.innerHTML : '';

        this.setState({
            submitting: true
        });

        let result = await axios
            .post('/contests/submit', {
                contest_id: this.state.contest.contest_id,
                language,
                solution,
                explanation
            });

        this.setState({
            submitting: false
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

    async delete(contest_submission_id) {
        bootbox.confirm({
            message: 'Are you sure you want to delete this submission?',
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
            callback: async function (result) {
                if (!result) return;

                let res = await axios
                    .post('/admin/submissions/delete', { contest_submission_id });

                location = location;
            }
        });
    }

    async validate() {
        this.setState({
            validating: true
        });

        let res = await axios
            .post('/admin/submissions/validate/' + this.state.contest.contest_id);

        let { invalids } = res.data;

        this.setState({
            validating: false
        });

        if (!invalids.length) {
            return bootbox.alert('No invalid submissions were found')
        }

        let invalids_str = '';

        for (let invalid of invalids) {
            invalids_str += `(#${invalid.contest_submission_id}) ${invalid.language}\
            submission of length ${invalid.length}<br />`
        }

        return bootbox.alert('The following invalid submissions were found:<br />' + invalids_str);
    }

    render() {
        return (
            <div class="em_contests_contest">
                <h4 class="header green f500 marginbottom20">{this.state.contest.name}</h4>

                <div class="ql-snow marginbottom20">
                    <div
                        class="ql-editor"
                        dangerouslySetInnerHTML={{ __html: this.ops_to_html(this.state.contest.description)}}>
                    </div>
                </div>

                <h5 class="green marginbottom10">Test Cases</h5>
                <div class="marginbottom20">
                    {this.props.cases.map((c, i) => {
                        return (
                            <div key={'test-' + i}>
                                <h6>Test Case {i+1}</h6>
                                <pre class="case_text">
                                    {c.inputs.map((input, i) => {
                                        return (
                                            <div key={'input-' + i}>
                                                Argument {i+1}: {input}
                                                {'\n'}
                                            </div>
                                        );
                                    })}
                                    Expected Output: {c.output}
                                </pre>
                            </div>
                        );
                    })}
                </div>

                <h5 class="green">Your Submission</h5>
                <div class="marginbottom20">
                    {ctx.user_id && (
                        <div>
                            {this.state.contest.active && (
                                <p>
                                    It's recommended that you compose your solution separately and just paste
                                    here once you're ready. After clicking "Submit Solution" your solution will be
                                    tested with the given inputs. If successful, your solution will be saved. Be sure
                                    to choose the correct language.
                                </p>

                            ) || (
                                <p class="text-warning">
                                    This contest is no longer active but you can click "Submit Solution" to make a late
                                    submission (you will not receive score for your submission).
                                    Your solution will be tested with the given inputs and saved if it
                                    passes all the tests. Be sure to choose the correct language.
                                </p>
                            )}
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
                            {this.props.submissions && this.props.submissions.length > 0 && (
                                <div class="form-group">
                                    <small>
                                        You have solutions in:
                                        {' '}
                                        {this.props.submissions.map((submission, i) => {
                                            return (
                                                <span key={submission.language + "-" + submission.late}>
                                                    {submission.language} ({submission.length})
                                                    {i + 1 < this.props.submissions.length && ', '}
                                                </span>
                                            );
                                        })}
                                    </small>
                                </div>
                            )}
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
                                <label>
                                    (Optional) Share your knowledge!<br/>Explain your solution so others
                                    can understand it when the contest is over.
                                </label>
                                <div id="explanation"></div>
                            </div>
                            <div class="form-group">
                                <button
                                    type="button"
                                    class="btn btn-sm btn-success"
                                    disabled={this.state.submitting}
                                    onClick={this.submit}>

                                    {this.state.submitting ? 'Submitting...' : 'Submit Solution'}
                                </button>
                                {' '}
                                {!this.state.passed && (
                                    <span class="text-danger">Sorry, your solution does not satisfy the requirements</span>
                                )}
                            </div>
                        </div>
                    ) || (
                        <div>
                            You are not logged in. To submit a solution, click the Login button at the top right.
                        </div>
                    )}
                </div>

                <h5 class="green">
                    Submissions
                    {' '}
                    {!!ctx.is_staff && (
                        <div class="float-right">
                            <button
                                type="button"
                                class="btn btn-sm btn-warning"
                                disabled={this.state.validating}
                                onClick={this.validate}>

                                {this.state.validating ? 'Re-validating...': 'Re-validate submissions'}
                            </button>
                            {' '}
                        </div>
                    )}
                </h5>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a
                            class={this.state.showing_late
                                ? "pointer nav-link" : "pointer nav-link green-back"}
                            onClick={() => {
                                this.setState({
                                    showing_late: false,
                                    shown_submissions: this.on_time_submissions
                                });
                            }}
                        >
                            On time
                        </a>
                    </li>
                    <li class="nav-item">
                        <a
                            class={this.state.showing_late
                                ? "pointer nav-link green-back" : "pointer nav-link"}
                            onClick={() => {
                                this.setState({
                                    showing_late: true,
                                    shown_submissions: this.late_submissions
                                });
                            }}
                        >
                            Late
                        </a>
                    </li>
                </ul>
                {this.state.shown_submissions.map(submission => {
                    return (
                        <div key={submission.contest_submission_id} class="submission">
                            <div class="heading">
                                <div class="main">
                                    <div class="summary">
                                        {submission.length} characters with {submission.language}
                                        {' '}
                                        {submission.overall_first && <img src="/images/awards/1.png" />}
                                        {' '}
                                        {submission.overall_second && <img src="/images/awards/2.png" />}
                                        {' '}
                                        {submission.overall_third && <img src="/images/awards/3.png" />}
                                        {' '}
                                        {submission.language_first && <img src="/images/awards/4.png" />}
                                    </div>
                                    <div class="time">
                                        Submitted: {moment(submission.created_at).format('MMMM D, YYYY @ h:mm:ss a')}
                                        {' '}
                                        (#{submission.contest_submission_id})
                                        {' '}
                                        {!!ctx.is_staff && (
                                            <a
                                                onClick={() => this.delete(submission.contest_submission_id)}
                                                class="fas fa-trash text-danger pointer"
                                            ></a>
                                        )}
                                    </div>
                                    {!this.state.contest.active && submission.explanation.length > 1 && (
                                        <div
                                            id={submission.contest_submission_id}
                                            class="explanation_text pointer green"
                                            onClick={this.change_shown_explanation}>
                                            {this.state.shown_explanation !== submission.contest_submission_id
                                                ? "Show Explanation"
                                                : "Hide Explanation"
                                            }
                                        </div>
                                    )}
                                </div>
                                <a href={'/@' + submission.user.username} class="user">
                                    <img src={ctx.cdn_url + submission.user.avatar_url} />
                                    {' '}
                                    {submission.user.username}
                                </a>
                            </div>
                            {!this.state.contest.active && (
                                <pre class="solution marginbottom5">
                                    {submission.solution}
                                </pre>
                            )}
                            {!this.state.contest.active &&
                                this.state.shown_explanation === submission.contest_submission_id
                                && (
                                    <div
                                        class="solution"
                                        dangerouslySetInnerHTML={{ __html: submission.explanation }}
                                    ></div>
                                )}

                        </div>
                    );
                })
                }
            </div>
        );
    }

}

Util.try_render('react_contest_contest', Contest);

export default Contest;
