class UserComment extends React.Component {

    ops_to_html(ops) {
            try {
            ops = JSON.parse(ops).ops;
            var tmp = document.createElement('div');
            (new Quill(tmp, {modules:{syntax: true}})).setContents(ops);
            return tmp.getElementsByTagName('p')[0].innerHTML;
        } catch (e) {
            return '';
        }
    }

    render() {
        console.log(this.props);
        return (
            <a href={this.props.comment.question.url} class="user_comment">
                <div class="user_comment_box">
                    <div class="user_question_title">
                        <span>{ this.props.username } commented on {this.props.comment.question.title}</span>
                    </div>
                    <div>
                        <div
                            class="user_comment_comment"
                            dangerouslySetInnerHTML={{__html: this.ops_to_html(this.props.comment.comment)}}></div>
                    </div>
                    <div class="user_comment_row">
                        <span>Score:</span>
                        <span class="user_comment_view">{this.props.comment.score}</span>
                    </div>
                </div>
            </a>
        )
    }

}
