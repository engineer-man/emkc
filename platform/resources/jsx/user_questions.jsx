class UserQuestions extends React.Component {

    render() {
        console.log(this.props);
        return (
            this.props.questions &&
            this.props.questions.map(question => <UserQuestion question={question} username={this.props.username} /> ) 
        )
    }

}
