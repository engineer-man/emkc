class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: props.comments
        };
    }

    add() {
        this.setState({
            comments: this.state.comments.concat([{score:99}])
        })
    }

    render() {
        return (
            this.state.comments &&
            this.state.comments.map(comment => <Comment comment={comment} />)
        )
    }
}
