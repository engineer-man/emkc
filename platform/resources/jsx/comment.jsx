class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reply_open: false,
            edit_open: false,
            comment: props.comment
        };

        this.toggle_reply = this.toggle_reply.bind(this);
        this.toggle_edit = this.toggle_edit.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
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

    toggle_reply() {
        this.setState({
            reply_open: !this.state.reply_open,
            edit_open: false
        });
    }

    toggle_edit() {
        this.setState({
            reply_open: false,
            edit_open: !this.state.edit_open
        });
    }

    insert(comment) {
        this.setState(prev => {
            return {
                reply_open: !prev.reply_open,
                comment: {
                    ...prev.comment,
                    comments: [comment, ...prev.comment.comments]
                }
            }
        });
    }

    update(comment) {
        this.setState(prev => {
            return {
                edit_open: !prev.edit_open,
                comment: {
                    ...prev.comment,
                    comment: JSON.stringify(comment)
                }
            }
        });
    }

    render() {
        return (
            <div class="comment">
                <Score
                    mode={'comment'}
                    pk={this.state.comment.comment_id}
                    score={this.state.comment.score}
                    value={this.state.comment.value} />
                <div class="content">
                    <div class="posted">
                        <img src={this.state.comment.avatar_url} />
                        <a href={'/@' + this.state.comment.username}>
                            {this.state.comment.display_name}
                        </a>
                        {' '}
                        <span>
                            {this.state.comment.time_ago === 'now' ? 'just now' : this.state.comment.time_ago + ' ago'}
                        </span>
                    </div>
                    <div class="ql-snow">
                        <div
                            class="ql-editor"
                            dangerouslySetInnerHTML={{__html: this.ops_to_html(this.state.comment.comment)}}></div>
                    </div>
                    <div class="actions">
                        <a
                            class="reply"
                            onClick={ctx.user_id ? this.toggle_reply : () => login.open()}>
                            <i class="fa fa-reply"></i> reply
                        </a>
                        {
                            ctx.user_id && ctx.user_id === this.state.comment.user_id
                                ?
                                <a
                                    class="edit"
                                    onClick={this.toggle_edit}>
                                    <i class="fa fa-edit"></i> edit
                                </a>
                                :
                                null
                        }
                    </div>
                </div>
                {
                    this.state.reply_open
                        ?
                        <CreateEditComment
                            insert={this.insert}
                            toggle_reply={this.toggle_reply}
                            question_id={this.state.comment.question_id}
                            parent_id={this.state.comment.comment_id}
                            can_cancel={true} />
                        :
                        null
                }
                {
                    this.state.edit_open
                        ?
                        <CreateEditComment
                            update={this.update}
                            toggle_edit={this.toggle_edit}
                            comment={this.state.comment.comment}
                            comment_id={this.state.comment.comment_id}
                            can_cancel={true} />
                        :
                        null
                }
                <div class="nested_comments">
                    {
                        this.state.comment.comments &&
                        this.state.comment.comments.map(comment => <Comment key={comment.comment_id} comment={comment} />)
                    }
                </div>
            </div>
        )
    }

}
