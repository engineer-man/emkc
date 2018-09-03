class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reply_open: false,
            comment: props.comment
        };

        this.toggle_reply = this.toggle_reply.bind(this);
        this.insert = this.insert.bind(this);
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
            reply_open: !this.state.reply_open
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
                        </a> {this.state.comment.time_ago === 'now' ? 'just now' : this.state.comment.time_ago + ' ago'}
                    </div>
                    <div class="ql-snow">
                        <div
                            class="ql-editor"
                            dangerouslySetInnerHTML={{__html: this.ops_to_html(this.state.comment.comment)}}></div>
                    </div>
                    <a onClick={this.toggle_reply}><i class="fa fa-reply"></i> reply</a>
                </div>
                {
                    this.state.reply_open
                        ? <CreateComment
                            insert={this.insert}
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
