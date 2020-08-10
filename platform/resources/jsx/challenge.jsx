import React from 'react';
import axios from 'axios';

import Util from 'js/util';

class Challenge extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            solved: props.solved,
            challenge: props.challenge,
            language: props.language,
            template: props.challenge.solution && props.challenge.solution.solution || props.template,
            abstract: props.abstract,
            monaco_language: props.monaco_language,
            executing: false,
            test_results: [],
            changed: false
        };

        this.execute = this.execute.bind(this);
        this.editor_change = this.editor_change.bind(this);
        this.before_unload = this.before_unload.bind(this);

        // Add event listener for when the user leaves with unsaved work
        window.addEventListener('beforeunload', this.before_unload, false);
    }

    componentDidMount() {
        this.editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'em',
            language: this.state.monaco_language,
            value: this.state.template,
            automaticLayout: true,
            fontSize: 16,
            onChange: this.on_editor_change,
        });

        // Bind event listener for when the editor changes; unsaved work
        this.editor.onDidChangeModelContent(this.editor_change);
    }

    componentWillUnmount() {
        // Remove event listener on unmount
        window.removeEventListener('beforeunload', this.before_unload, false);
    }

    async execute() {
        this.setState({
            executing: true,
            test_results: []
        });

        let res = await axios
            .post('/challenges/execute/' + this.state.challenge.challenge_id, {
                language: this.state.language,
                source: this.editor.getValue()
            });

        let solved = res.data.filter(r => !r.passed).length === 0;

        if (solved) {
            this.setState({
                solved: true,

                // The challenge's code saves on solve
                // Therefore, we can disable the "close protection"
                changed: false
            });
        }

        this.setState({
            executing: false,
            test_results: res.data
        });
    }

    editor_change(_) {
        // Only change state when necessary
        if (!this.state.changed) {
            // The editor's contents have changed
            this.setState({
                changed: true
            });
        }
    }

    before_unload(e) {
        if (this.state.changed) {
            // Unsaved work, prompt user!
            e.preventDefault();
            e.returnValue = true;
        }
    }

    render() {
        let text_color;

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
                    <span class={'badge badge-' + (this.state.solved ? text_color : 'light')}>
                        {this.state.solved ? 'Solved' : 'Unsolved'}
                    </span>
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
                                <div key={result.name} class="result">
                                    <span class="f700">{result.name}</span>
                                    {' '}
                                    <span class={'badge badge-' + (result.passed ? 'success' : 'danger')}>
                                        {result.passed ? 'passed' : 'failed'}
                                    </span>
                                    <br/>
                                    {result.input.split('@@!@!@!@@').map((input, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <span class="badge badge-info">value{i+1}</span> {input}<br/>
                                            </React.Fragment>
                                        )
                                    })}
                                    <span class="badge badge-dark">expected output</span> {result.expected}<br/>
                                    <span class="badge badge-dark">actual output</span> <span dangerouslySetInnerHTML={{__html: result.actual.split('\n').map(a => a + '<br/>').join('')}}></span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

Util.try_render('react_challenge', Challenge);

export default Challenge;
