class BoardQuestion extends React.Component {

    render() {
        return (
            <a href={this.props.question.url} class="question">
                <div class="score_box">
                    <div>
                        Score
                        <div class="score">{this.props.question.score}</div>
                    </div>
                </div>
                <div class="views_box">
                    <div>
                        Views
                        <div class="views">{this.props.question.views}</div>
                    </div>
                </div>
                <div class="content">
                    <h5>{this.props.question.title}</h5>
                    <div class="tag_list">
                        <Tags tags={this.props.question.tags} />
                    </div>
                    <div class="posted">
                        <img src={this.props.question.user.avatar_url} />
                        <a href={'/@' + this.props.question.user.username}>
                            {this.props.question.user.display_name}
                        </a> {this.props.question.time_ago === 'now' ? 'just now' : this.props.question.time_ago + ' ago'}
                    </div>
                </div>
            </a>
        )
    }

}
