class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reply_open: false,
            comment: props.comment
        };

        this.toggle_reply = this.toggle_reply.bind(this);
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
            reply_open: !this.state.reply_open
        });
    }

    render() {
        return (
            <div class="comment">
                <Score score={this.state.comment.score} />
                <div class="content">
                    <div class="posted">
                        <a href={'/@' + this.state.comment.username}>
                            {this.state.comment.username}
                        </a> {this.state.comment.time_ago === 'now' ? 'just now' : this.state.comment.time_ago + ' ago'}
                    </div>
                    <div
                        class="ql-editor"
                        dangerouslySetInnerHTML={{__html: this.ops_to_html(this.state.comment.comment)}}></div>
                    <a onClick={this.toggle_reply}>reply</a>
                </div>
                {
                    this.state.reply_open
                        ? <CreateComment
                            question_id={this.state.comment.question_id}
                            parent_id={this.state.comment.comment_id} />
                        : null
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
