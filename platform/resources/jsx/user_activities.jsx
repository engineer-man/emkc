class UserActivities extends React.Component {

    render() {
        console.log(this.props);
        return (
            this.props.questions &&
            this.props.questions.map(question => <UserActivity question={question} username={this.props.username} /> )
        )
    }

}
