import React from 'react';
import axios from 'axios';

import Util from 'js/util';

class ManageSnippet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snip: this.props.mode === 'create' ? '' : this.props.snip,
            language: this.props.mode === 'create' ? 'javascript' : this.props.language,
            word_wrap: 'off',
            runnable_language: false,
            executing: false,
            stdin: '',
            argv: '',
            compile_output: '',
            stdout: '',
            stderr: ''
        };

        this.monaco_piston_map = {
            abap: 'none',
            aes: 'none',
            apex: 'none',
            awk: 'awk',
            azcli: 'none',
            bat: 'none',
            bicep: 'none',
            c: 'c',
            cameligo: 'none',
            cjam: 'cjam',
            clojure: 'clojure',
            cobol: 'cobol',
            coffeescript: 'coffeescript',
            cow: 'cow',
            cpp: 'cpp',
            crystal: 'crystal',
            csharp: 'csharp',
            csp: 'none',
            css: 'none',
            d: 'd',
            dart: 'dart',
            dash: 'dash',
            dockerfile: 'none',
            dragon: 'dragon',
            ecl: 'none',
            elixir: 'elixir',
            emacs: 'emacs',
            erlang: 'erlang',
            fortran: 'fortran',
            fsharp: 'fsharp.net',
            go: 'go',
            golfscript: 'golfscript',
            graphql: 'none',
            groovy: 'groovy',
            handlebars: 'none',
            haskell: 'haskell',
            hcl: 'none',
            html: 'none',
            ini: 'none',
            java: 'java',
            javascript: 'javascript',
            jelly: 'jelly',
            json: 'none',
            julia: 'julia',
            kotlin: 'kotlin',
            less: 'none',
            lexon: 'none',
            liquid: 'none',
            lisp: 'lisp',
            lua: 'lua',
            lolcode: 'lolcode',
            m3: 'none',
            markdown: 'none',
            mips: 'none',
            msdax: 'none',
            mysql: 'none',
            'objective-c': 'none',
            nasm: 'nasm',
            nasm64: 'nasm64',
            nim: 'nim',
            ocaml: 'ocaml',
            octave: 'octave',
            osabie: 'osabie',
            paradoc: 'paradoc',
            pascal: 'pascal',
            pascaligo: 'none',
            perl: 'perl',
            pgsql: 'none',
            php: 'php',
            plaintext: 'none',
            ponylang: 'ponylang',
            postiats: 'none',
            powerquery: 'none',
            powershell: 'powershell',
            prolog: 'prolog',
            pure: 'pure',
            pug: 'none',
            pyth: 'pyth',
            python: 'python',
            python2: 'python2',
            qsharp: 'none',
            r: 'r',
            raku: 'raku',
            razor: 'none',
            redis: 'none',
            redshift: 'none',
            restructuredtext: 'none',
            rockstar: 'rockstar',
            ruby: 'ruby',
            rust: 'rust',
            sb: 'none',
            scala: 'scala',
            scheme: 'none',
            scss: 'none',
            shell: 'bash',
            sol: 'none',
            sparql: 'none',
            sql: 'none',
            st: 'none',
            swift: 'swift',
            systemverilog: 'none',
            tcl: 'none',
            twig: 'none',
            typescript: 'typescript',
            vb: 'vb',
            verilog: 'none',
            vlang: 'vlang',
            xml: 'none',
            yaml: 'none',
            yeethon: 'yeethon',
            zig: 'zig'
        };

        this.change_language = this.change_language.bind(this);
        this.handle_change = this.handle_change.bind(this);
        this.execute = this.execute.bind(this);
        this.toggle_word_wrap = this.toggle_word_wrap.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.state.editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'em',
            language: this.state.language,
            automaticLayout: true,
            value: this.state.snip,
            readOnly: this.props.mode === 'view',
            fontSize: 16
        });
        this.props.mode !== 'view' &&
            this.state.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, this.save);
        this.state.editor.addCommand(monaco.KeyCode.F9, this.execute);
        this.check_runnable_language();
    }

    check_runnable_language() {
        this.setState({
            runnable_language:
                this.state.language in this.monaco_piston_map &&
                this.monaco_piston_map[this.state.language] !== 'none'
        });
    }

    async execute() {
        if (!this.state.runnable_language) {
            return;
        }
        this.setState({
            executing: true
        });
        const result = await axios.post('/api/v2/piston/execute', {
            language: this.state.language,
            version: '*',
            files: [{ content: this.state.editor.getValue() }],
            args: this.state.argv === '' ? [] : this.state.argv.split('\n'),
            stdin: this.state.stdin
        });
        this.setState({
            executing: false
        });
        if (result.status === 400) {
            return bootbox.alert('An internal error has occurred.');
        }
        // Check if it is a compiled language
        const compile_output = 'compile' in result.data ? result.data.compile.output : '';
        const { stdout, stderr } = result.data.run;
        this.setState({ compile_output, stdout, stderr });
    }

    handle_change(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    change_language(event) {
        this.setState(
            {
                language: event.target.value
            },
            this.check_runnable_language
        );

        monaco.editor.setModelLanguage(this.state.editor.getModel(), event.target.value);
    }

    toggle_word_wrap() {
        const word_wrap = this.state.word_wrap === 'off' ? 'bounded' : 'off';
        this.state.editor.updateOptions({
            wordWrap: word_wrap
        });
        this.setState({
            word_wrap
        });
    }

    async save() {
        const url =
            this.props.mode === 'update' ? '/snippets/edit/' + this.props.hash : '/snippets';
        const res = await axios.post(url, {
            language: this.state.language,
            snip: this.state.editor.getValue()
        });

        if (res.status >= 300) {
            return bootbox.alert('Please provide some code');
        }

        location = res.data.url;
    }

    render() {
        return (
            <div class="em_manage_snippet">
                <div class="menu">
                    <div class="wrapper">
                        <div class="language">
                            {(this.props.mode !== 'view' && (
                                <select
                                    onChange={this.change_language}
                                    defaultValue={this.state.language}
                                    class="form-control"
                                >
                                    {Object.keys(this.monaco_piston_map).map((language) => {
                                        return <option key={language}>{language}</option>;
                                    })}
                                </select>
                            )) || (
                                <>
                                    <span class="language_label f700">Language:</span>
                                    {this.props.language}
                                </>
                            )}
                        </div>
                        <div>
                            <button
                                type="button"
                                title="Toggle word wrap"
                                class="btn btn-md btn-dark control-button"
                                onClick={this.toggle_word_wrap}
                            >
                                Wrap
                            </button>
                            {this.state.runnable_language && (
                                <button
                                    type="button"
                                    title="Run the code (F9)"
                                    class="btn btn-md btn-primary control-button"
                                    disabled={this.state.executing}
                                    onClick={this.execute}
                                >
                                    <i class="fas fa-play"></i>
                                </button>
                            )}
                            {(this.props.mode !== 'view' && (
                                <button
                                    type="button"
                                    title="Save the snippet (Ctrl + S)"
                                    class="btn btn-md btn-success control-button"
                                    onClick={this.save}
                                >
                                    <i class="fas fa-save"></i>
                                </button>
                            )) ||
                                (ctx.user_id === this.props.user_id && (
                                    <button
                                        type="button"
                                        title="Edit the snippet"
                                        class="btn btn-md btn-success control-button"
                                        onClick={() => {
                                            location = `/snippets/edit/${this.props.hash}`;
                                        }}
                                    >
                                        <i class="fas fa-pen"></i>
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
                <div
                    id="editor"
                    style={this.state.runnable_language ? { height: '55vh' } : {}}
                ></div>
                {this.state.runnable_language && (
                    <div class="run-data text-monospace">
                        <div class="inputs-outputs">
                            <div class="form-group">
                                <label>Standard Input</label>
                                <textarea
                                    id="stdin"
                                    class="form-control"
                                    rows="4"
                                    onChange={this.handle_change}
                                ></textarea>
                            </div>
                            <div class="form-group">
                                <label>Command-line arguments (separated by a new line)</label>
                                <textarea
                                    id="argv"
                                    class="form-control"
                                    rows="4"
                                    onChange={this.handle_change}
                                ></textarea>
                            </div>
                        </div>
                        <div class="inputs-outputs">
                            <label>Compile Output</label>
                            <div class="info">
                                <pre>{this.state.compile_output}</pre>
                            </div>
                            <label>Standard Output</label>
                            <div class="info">
                                <pre>{this.state.stdout}</pre>
                            </div>
                            <label>Standard Error</label>
                            <div class="info">
                                <pre>{this.state.stderr}</pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Util.try_render('react_manage_snippet', ManageSnippet);

export default ManageSnippet;
