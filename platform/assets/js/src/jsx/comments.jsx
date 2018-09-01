class Comments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: props.comments
        };

        this.insert = this.insert.bind(this);
    }

    insert(comment) {
        this.setState(prev => {
            return {
                comments: [comment, ...prev.comments]
            }
        });
    }

    render() {
        return (
            this.state.comments &&
            this.state.comments.map(comment =>
                <Comment
                    key={comment.comment_id}
                    insert={this.insert}
                    comment={comment} />
            )
        )
    }

}
