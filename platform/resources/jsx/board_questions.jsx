class BoardQuestions extends React.Component {

    render() {
        return (
            this.props.questions &&
            this.props.questions.map(question => <BoardQuestion question={question} /> )
        )
    }

}
