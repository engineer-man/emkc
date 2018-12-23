class UserQuestion extends React.Component {

    render() {
        return (
            <a href={this.props.question.url} class="user_activity">
                <div class="user_activity_box">
                    <h4 class="title">{this.props.question.title}</h4>
                    <div class="user_activity_row">
                        <span>Reply Count:</span>
                        <span class="user_activity_comments">{this.props.question.comments}</span>
                    </div>
                    <div class="user_activity_row">
                        <span>Views:</span>
                        <span class="user_activity_view">{this.props.question.views}</span>
                    </div>
                    <div class="user_activity_row">
                        <span>Votes:</span>
                        <span class="user_activity_score">{this.props.question.score}</span>
                    </div>
                    <div class="user_activity_row">
                        Posted:
                        {' '}
                        {this.props.question.time_ago === 'now' ? 'just now' : this.props.question.time_ago + ' ago'}
                    </div>
                </div>
            </a>
        )
    }

}
