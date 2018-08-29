class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: props.score,
            comment: props.comment
        };
    }

    render() {
        return (
            <div class="comment">
                <Score score={this.state.comment.score} />
                <div class="content">
                    <div class="posted">
                        <a href={'/@' + this.state.comment.username}>
                            {this.state.comment.username}
                        </a> {this.state.comment.time_ago} ago
                    </div>
                    <div class="text">
                        <p>
                            {this.state.comment.comment}
                        </p>
                    </div>
                    <a href="#">reply</a>
                </div>
                <div class="nested_comments">
                    {
                        this.state.comment.comments &&
                        this.state.comment.comments.map(comment => <Comment comment={comment} />)
                    }
                </div>
            </div>
        )
    }
}
