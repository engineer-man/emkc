class CreateEditComment extends React.Component {

    constructor(props) {
        super(props);

        this.create = this.create.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        var quill_ele = this.props.comment
            ? '#edit_comment_editor_' + this.props.comment_id
            : '#create_comment_editor_' + (this.props.parent_id || 'base');

        this.quill = new Quill(quill_ele, {
            theme: 'snow',
            placeholder: 'Comment here',
            modules: {
                syntax: true,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block', 'link'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            }
        });

        if (this.props.comment) {
            this.quill.setContents(JSON.parse(this.props.comment));
        }
    }

    create() {
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

                this.quill.setContents('');
                this.props.insert(res.data.payload.comment);
            });
    }

    save() {
        const comment_id = this.props.comment_id;
        const comment = JSON.stringify(this.quill.getContents());

        return axios
            .post('/comments/save', {
                comment_id,
                comment
            })
            .then(res => {
                if (res.data.status === 'error') {
                    return bootbox.alert(res.data.payload.message);
                }

                this.props.update(this.quill.getContents());
                this.quill.setContents('');
            });
    }

    reset() {
        this.quill.setContents('');

        if (this.props.comment) {
            this.props.toggle_edit();
        } else {
            this.props.toggle_reply();
        }
    }

    render() {
        return (
            <div class="em_create_comment">
                <div class="form-group">
                    {
                        this.props.comment
                            ? <div id={'edit_comment_editor_' + this.props.comment_id}></div>
                            : <div id={'create_comment_editor_' + (this.props.parent_id || 'base')}></div>
                    }
                </div>
                {
                    this.props.comment
                        ? <button type="button" class="btn btn-sm btn-success" onClick={this.save}>Save</button>
                        : <button type="button" class="btn btn-sm btn-success" onClick={this.create}>Post</button>
                }
                {
                    this.props.can_cancel
                        ? <button type="button" class="btn btn-sm btn-dark" onClick={this.reset}>Cancel</button>
                        : null
                }
            </div>
        )
    }

}
