class BoardQuestion extends React.Component {

    render() {
        return (
            <a href={this.props.question.url} class="question">
                <div class="stat_box">
                    <div>
                        Score
                        <div class="score">{this.props.question.score}</div>
                    </div>
                    {' '}
                    <div>
                        Views
                        <div class="views">{this.props.question.views}</div>
                    </div>
                    {' '}
                    <div>
                        Replies
                        <div class="comments">{this.props.question.comments}</div>
                    </div>
                </div>
                <div class="content">
                    <div>
                        <div class="posted">
                            <img src={this.props.question.user.avatar_url} />
                            <a href={'/@' + this.props.question.user.username}>
                                {this.props.question.user.display_name}
                            </a> {this.props.question.time_ago === 'now' ? 'just now' : this.props.question.time_ago + ' ago'}
                        </div>
                        <span class="title">{this.props.question.title}</span>
                    </div>
                    <div class="tag_list">
                        <Tags tags={this.props.question.tags} />
                    </div>
                </div>
            </a>
        )
    }

}
