class CreateComment extends React.Component {

    constructor(props) {
        super(props);

        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.quill = new Quill('#create_comment_editor_' + (this.props.parent_id || 'base'), {
            theme: 'snow',
            placeholder: 'Comment here',
            modules: {
                syntax: true,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            }
        });

        if (this.props.comment) {
            this.quill.setContents(this.props.comment);
        }
    }

    save(url) {
        const question_id = this.props.question_id;
        const parent_id = this.props.parent_id || null;
        const comment = JSON.stringify(this.quill.getContents());

        return axios
            .post('/comments/create', {
                question_id,
                parent_id,
                comment
            })
            .then(res => {
                if (res.data.status === 'error') {
                    return bootbox.alert(res.data.payload.message);
                }

                comments.insert(res.data.payload.comment);
            });
    }

    render() {
        return (
            <div class="em_create_comment">
                <div class="form-group">
                    <div id={'create_comment_editor_' + (this.props.parent_id || 'base')}></div>
                </div>

                <button type="button" class="btn btn-sm btn-success" onClick={this.save}>Post</button>
            </div>
        )
    }

}
