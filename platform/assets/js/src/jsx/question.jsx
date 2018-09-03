class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: props.score
        };
    }

    componentDidMount() {
        $('.ql-syntax').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }

    ops_to_html(ops) {
        var tmp = document.createElement('div');
        (new Quill(tmp, {modules:{syntax: true}})).setContents(ops);
        return tmp.getElementsByClassName('ql-editor')[0].innerHTML;
    }

    render() {
        return (
            <div class="em_question">
                <Score
                    mode={'question'}
                    pk={this.props.question_id}
                    score={this.props.score}
                    value={this.props.value} />
                <div class="content">
                    {
                        this.props.session_user_id === this.props.user_id
                            ?
                            <div class="dropdown">
                                <span class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-ellipsis-v"></i>
                                </span>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" href={'/questions/edit/' + this.props.question_id}>Edit</a>
                                </div>
                            </div>
                            :
                            ''
                    }
                    <div class="posted">
                        <img src={this.props.user.avatar_url} />
                        {' '}
                        <a href={'/@' + this.props.user.username}>
                            {this.props.user.display_name}
                        </a>
                        {this.props.time_ago}
                        {' '}
                        ago
                    </div>
                    <h3 class="f700">{this.props.title}</h3>
                    <div class="ql-snow">
                        <div class="ql-editor" dangerouslySetInnerHTML={{__html: this.ops_to_html(this.props.question)}}></div>
                    </div>
                    <div class="tag_list">
                        <Tags tags={this.props.tags} />
                    </div>
                </div>
            </div>
        )
    }
}
