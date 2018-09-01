class Comments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: props.comments
        };
    }

    insert(comment) {
        this.setState({
            comments: [comment, ...this.state.comments]
        });
    }

    render() {
        return (
            this.state.comments &&
            this.state.comments.map(comment => <Comment key={comment.comment_id} comment={comment} />)
        )
    }

}
