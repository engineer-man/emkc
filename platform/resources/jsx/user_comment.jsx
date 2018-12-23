class UserComment extends React.Component {

    render() {
        console.log(this.props);
        return (
            <h1 class="user_activity">{this.props.comment.score}</h1>
        )
    }

}
