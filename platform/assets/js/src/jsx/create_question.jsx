class CreateQuestion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.title || '',
            tags: [
                {
                    name: 'test'
                },
                {
                    name: 'test 2'
                },
                {
                    name: 'test 3'
                },
            ]
        };

        this.save = this.save.bind(this);
        this.update_title = this.update_title.bind(this);
    }

    componentDidMount() {
        this.quill = new Quill('#question', {
            theme: 'snow',
            placeholder: 'Compose your question here',
            modules: {
                syntax: true,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            }
        });

        if (this.props.question) {
            this.quill.setContents(this.props.question);
        }
    }

    save(url) {
        const title = this.state.title;
        const question = JSON.stringify(this.quill.getContents());

        var url;

        if (this.props.mode === 'create')
            url = '/questions/ask';
        if (this.props.mode === 'edit')
            url = '/questions/edit/' + this.props.question_id;

        return axios
            .post(url, {
                title,
                question
            })
            .then(res => {
                if (res.data.status === 'error') {
                    return bootbox.alert('Please provide a title and a question');
                }

                location = res.data.payload.url;
            });
    }

    update_title(event) {
        this.setState({
            title: event.target.value
        });
    }

    render() {
        return (
            <div class="em_question_ask">
                <div class="contents">
                    <div class="col_padding">
                        <h5 class="f700">Title</h5>
                        <input
                            type="text"
                            id="title"
                            class="title"
                            placeholder="Title your question here"
                            value={this.state.title}
                            onChange={this.update_title} />

                        <h5 class="f700">Question</h5>
                        <div class="form-group">
                            <div id="question"></div>
                        </div>

                        <h5 class="f700">Tags</h5>
                        <div class="tag_list">
                            {
                                this.state.tags && this.state.tags.map(tag => <Tag tag={tag} />)
                            }
                            Enter a tag
                        </div>

                        <button type="button" class="btn btn-sm btn-success" onClick={this.save}>Save</button>
                    </div>
                </div>
                <div class="instructions">
                    <div class="col_padding">
                        <h5 class="f700">How to ask a good question</h5>
                        <p>
                            1. Provide all the necessary information, code, or otherwise to help others help you.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}
