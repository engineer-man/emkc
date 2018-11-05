class Challenge extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            challenge: props.challenge,
            language: props.language,
            template: props.template,
            abstract: props.abstract,
            monaco_language: props.monaco_language,
            executing: false,
            test_results: []
        };

        this.execute = this.execute.bind(this);
    }

    componentDidMount() {
        monaco.languages.typescript.javascriptDefaults
            .setCompilerOptions({ noLib: true, allowNonTsExtensions: true });

        this.editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'em',
            language: this.state.monaco_language,
            value: this.state.template,
            automaticLayout: true,
            fontSize: 16
        });
    }

    execute() {
        this.setState({
            executing: true,
            test_results: []
        });

        return axios
            .post('/challenges/execute/' + this.state.challenge.challenge_id, {
                language: this.state.language,
                source: this.editor.getValue()
            })
            .then(res => {
                this.setState({
                    executing: false,
                    test_results: res.data.payload.results
                });
            });
    }

    render() {
        var text_color;

        switch (this.state.challenge.difficulty) {
            case 1:
                text_color = 'easy';
                break;
            case 2:
                text_color = 'medium';
                break;
            case 3:
                text_color = 'hard';
                break;
        }

        return (
            <div class="em_challenge">
                <div class="instructions">
                    <h3 class={text_color}>{this.state.challenge.name}</h3>
                    <p>{this.state.challenge.description}</p>
                    <hr />
                    <button
                        class="btn btn-primary btn-block"
                        onClick={this.execute}
                        disabled={this.state.executing}>Execute</button>
                    <hr />
                    <div class="abstract" dangerouslySetInnerHTML={{__html: this.state.abstract}}></div>
                </div>
                <div class="editor">
                    <div id="editor"></div>
                </div>
                <div class="results">
                    <h4 class="f300">Test Results</h4>
                    {
                        this.state.test_results.map(result => {
                            return (
                                <div class="result">
                                    <span class="f700">{result.name}</span>
                                    {' '}
                                    <span class={'badge badge-' + (result.passed ? 'success' : 'danger')}>
                                        {result.passed ? 'passed' : 'failed'}
                                    </span>
                                    <br/>
                                    Supplied: {result.input}<br/>
                                    Expected: {result.expected}<br/>
                                    Actual:   <span dangerouslySetInnerHTML={{__html: result.actual.split('\n').map(a => a + '<br/>').join('')}}></span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}
