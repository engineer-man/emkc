class UserComments extends React.Component {

    render() {
        console.log(this.props);
        return (
            this.props.comments &&
            this.props.comments.map(comment => <UserComment comment={comment} username={this.props.username} /> ) 
        )
    }

}
