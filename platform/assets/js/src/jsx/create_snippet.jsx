class CreateSnippet extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            snip: ''
        };

        this.change = this.change.bind(this);
        this.save = this.save.bind(this);
    }

    change(event) {
        this.setState({
            snip: event.target.value
        });
    }

    save() {
        const { snip } = this.state;

        return axios
            .post('/snippets', {
                snip
            })
            .then(res => {
                if (res.data.status === 'error') {
                    return bootbox.alert('Please provide some code');
                }

                location = res.data.payload.url;
            });
    }

    render() {
        return (
            <div class="em_snippet_create">
                <div class="contents">
                    <div class="col1_padding">
                        <h5 class="f700">Contents</h5>
                        <textarea rows="12" placeholder="Paste your code here..." onChange={this.change}></textarea>
                        <button type="button" class="btn btn-md btn-success" onClick={this.save}>Save</button>
                    </div>
                </div>
                <div class="notes">
                    <div class="col2_padding">
                        <h5 class="f700">Snippet Notes</h5>
                        <p>
                            1. If you want to save your snips, please log in.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}
