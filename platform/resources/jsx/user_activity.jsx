class UserActivity extends React.Component {

    render() {
        return (
            <a href={this.props.question.url} class="question">
                <div class="stat_box">
                    <div>
                        <span>Score</span>
                        <span class="score">{this.props.question.score}</span>
                    </div>
                    <div>
                        <span>Replies</span>
                        <span class="comments">{this.props.question.comments}</span>
                    </div>
                </div>
                <div class="content">
                    <div class="title_wrapper">
                        <span class="title">{this.props.question.title}</span>
                        <div class="posted">
                            by
                            {' '}
                            <a href={'/@' + this.props.username}>
                                {this.props.username}
                            </a> {this.props.question.time_ago === 'now' ? 'just now' : this.props.question.time_ago + ' ago'}
                        </div>
                    </div>
                </div>
            </a>
        )
    }

}
