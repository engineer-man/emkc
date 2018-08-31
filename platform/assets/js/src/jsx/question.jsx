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
                <div class="scores">
                    <Score score={this.state.score} />
                </div>
                <div class="content">
                    <div class="dropdown">
                        <span class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-ellipsis-v"></i>
                        </span>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href={'/questions/edit/' + this.props.question_id}>Edit</a>
                        </div>
                    </div>
                    <div class="posted ql-snow">
                        posted by
                        {' '}
                        <a href={'/@' + this.props.user.username}>
                            {this.props.user.username}
                        </a>
                        {' '}
                        {this.props.time_ago}
                        {' '}
                        ago
                    </div>
                    <h3 class="f700">{this.props.title}</h3>
                    <div class="ql-editor" dangerouslySetInnerHTML={{__html: this.ops_to_html(this.props.question)}}></div>
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
