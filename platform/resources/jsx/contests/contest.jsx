import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Quill from 'quill';

import Util from 'js/util';

class Contest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contest: props.contest
        };
    }

    componentDidMount() {
        $('.ql-syntax').each(function(i, block) {
            hljs.highlightBlock(block);
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
