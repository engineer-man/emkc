class ComposeQuestion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.title || '',
            tag_term: '',
            tags: props.tags || [],
            tag_suggestions: []
        };

        this.save = this.save.bind(this);
        this.update_title = this.update_title.bind(this);
        this.handle_tag_input = this.handle_tag_input.bind(this);
        this.handle_tag_click = this.handle_tag_click.bind(this);
        this.handle_tag_remove = this.handle_tag_remove.bind(this);
    }

    componentDidMount() {
        this.quill = new Quill('#question', {
            theme: 'snow',
            placeholder: 'Compose your question here',
            modules: {
                syntax: true,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block', 'link'],
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

    handle_tag_input(event) {
        var code = event.which || event.keyCode;

        var root = $('.tag_input_wrapper .results div');
        var results_count = root.length;
        var highlight_idx = null;

        root.each((i, item) => {
            if ($(item).hasClass('active')) highlight_idx = i;
        });

        switch (code) {
            // up
            case 38:
                if (highlight_idx === null) return null;
                root.removeClass('active');
                if (highlight_idx === 0) {
                    root.eq(0).removeClass('active');
                } else {
                    root.eq(highlight_idx-1).addClass('active');
                }
                return null;

            // down
            case 40:
                if (highlight_idx === null) {
                    root.eq(0).addClass('active');
                } else {
                    if (results_count === highlight_idx + 1) return null;
                    root.removeClass('active');
                    root.eq(highlight_idx+1).addClass('active');
                }
                return null;

            // enter
            case 13:
                root.eq(highlight_idx).click();
                return null;
        }

        this.setState({
            tag_term: event.target.value
        }, () => {
            var that = $('.tag_input');
            var span = $('.width_indicator');

            that.css('width', span.width() + 40 + 'px')
        });

        axios
            .get('/tags/search', {
                params: {
                    name: event.target.value
                }
            })
            .then(res => {
                this.setState({
                    tag_suggestions: res.data.payload.tags
                });
            });
    }

    handle_tag_click(event) {
        var new_tag = {
            tag_id: +event.target.dataset.id,
            name: event.target.textContent,
            is_removable: true
        };

        if (this.state.tags.some(tag => tag.tag_id === new_tag.tag_id)) return null;

        this.setState(prev => {
            return {
                tag_term: '',
                tag_suggestions: [],
                tags: prev.tags.concat([new_tag])
            }
        }, () => {
            document.getElementsByClassName('tag_input')[0].value = '';
            document.getElementsByClassName('tag_input')[0].focus();
        })
    }

    save(url) {
        const title = this.state.title;
        const question = JSON.stringify(this.quill.getContents());
        const tags = this.state.tags;

        var url;

        if (this.props.mode === 'create')
            url = '/questions/ask';
        if (this.props.mode === 'edit')
            url = '/questions/edit/' + this.props.question_id;

        return axios
            .post(url, {
                title,
                question,
                tags
            })
            .then(res => {
                if (res.data.status === 'error') {
                    return bootbox.alert(res.data.payload.message);
                }

                location = res.data.payload.url;
            });
    }

    update_title(event) {
        this.setState({
            title: event.target.value
        });
    }

    handle_tag_remove(event) {
        const tag_id = +event.target.parentNode.dataset.id;

        this.setState(prev => {
            return {
                tags: prev.tags.filter(tag => {
                    return tag.tag_id !== tag_id;
                })
            }
        });
    }

    render() {
        return (
            <div class="em_compose_question">
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
                            <Tags tags={this.state.tags} handle_tag_remove={this.handle_tag_remove} />
                            <div class="tag_input_wrapper">
                                <input type="text" class="tag_input" placeholder="Type tag..." onKeyUp={this.handle_tag_input} />
                                {
                                    this.state.tag_suggestions.length > 0
                                    ?
                                    (
                                        <div class="results">
                                            {
                                                this.state.tag_suggestions &&
                                                this.state.tag_suggestions.map(tag => {
                                                    return (
                                                        <div
                                                            data-id={tag.tag_id}
                                                            onClick={this.handle_tag_click}>{tag.name}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                    : null
                                }
                            </div>
                        </div>
                        <span class="width_indicator">{this.state.tag_term}</span>

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
