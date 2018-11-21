class UserActivities extends React.Component {

    render() {
        return (
            this.props.questions &&
            this.props.questions.map(question => <UserActivity question={question} username={this.props.username} /> )
        )
    }

}
