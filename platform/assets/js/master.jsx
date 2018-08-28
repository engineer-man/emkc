class Score extends React.Component {
    render() {
        return (
            <div class="scores">
                <i class="fa fa-chevron-up"></i>
                <div class="f700">
                    {this.props.score}
                </div>
                <i class="fa fa-chevron-down"></i>
            </div>
        )
    }
}

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: props.score
        };
    }

    render() {
        return (
            <div class="em_question">
                <div class="scores">
                    <Score score={this.state.score} />
                </div>
                <div class="content">
                    <div class="posted">
                        posted by <span class="user">engineerman</span> 3 minutes ago
                    </div>
                    <h3 class="f700">title</h3>
                    <p>
                        question
                    </p>
                    <Tag name={'node.js'} />
                    {' '}
                    <Tag name={'mysql'} />
                    {' '}
                    <Tag name={'concurrent-programming'} />
                </div>
            </div>
        )
    }
}

class Tag extends React.Component {
    render() {
        return (
            <span class="badge badge-success">{this.props.name}</span>
        )
    }
}

class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: props.comments
        };
    }

    add() {
        this.setState({
            comments: this.state.comments.concat([{score:99}])
        })
    }

    render() {
        return (
            this.state.comments &&
            this.state.comments.map(comment => <Comment comment={comment} />)
        )
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: props.score,
            comment: props.comment
        };
    }

    render() {
        return (
            <div class="comment">
                <Score score={this.state.comment.score} />
                <div class="content">
                    <div class="posted">
                        <a href={'/@' + this.state.comment.username}>
                            {this.state.comment.username}
                        </a> {this.state.comment.time_ago} ago
                    </div>
                    <div class="text">
                        <p>
                            {this.state.comment.comment}
                        </p>
                    </div>
                    <a href="#">reply</a>
                </div>
                <div class="nested_comments">
                    {
                        this.state.comment.comments &&
                        this.state.comment.comments.map(comment => <Comment comment={comment} />)
                    }
                </div>
            </div>
        )
    }
}
