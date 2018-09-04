class BoardQuestion extends React.Component {

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
                    <div>
                        <span class="title">{this.props.question.title}</span>
                        <div class="posted">
                            by
                            {' '}
                            <a href={'/@' + this.props.question.user.username}>
                                {this.props.question.user.display_name}
                            </a> {this.props.question.time_ago === 'now' ? 'just now' : this.props.question.time_ago + ' ago'}
                        </div>
                    </div>
                    <div class="tag_list">
                        <span class="badge badge-info">test</span>
                        <span class="badge badge-info">test 2</span>
                        <span class="badge badge-info">test 3</span>
                    </div>
                </div>
            </a>
        )
    }

}
// <div class="tag_list">
//     <Tags tags={this.props.question.tags} />
// </div>
