import React from 'react';
import axios from 'axios';

import Util from 'js/util';

class ManageSnippet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snip: this.props.hash ? this.props.snip : '',
            language: this.props.hash ? this.props.language : 'javascript',
            word_wrap: 'off'
        };

        this.change_language = this.change_language.bind(this);
        this.toggle_word_wrap = this.toggle_word_wrap.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.state.editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'em',
            language: this.state.language,
            automaticLayout: true,
            value: this.state.snip,
            fontSize: 16
        });
    }

    change_language(event) {
        this.setState({
            language: event.target.value
        });

        monaco.editor.setModelLanguage(this.state.editor.getModel(), event.target.value);
    }

    toggle_word_wrap() {
        let word_wrap = this.state.word_wrap === 'off' ? 'bounded' : 'off';
        this.state.editor.updateOptions({
            wordWrap: word_wrap
        });
        this.setState({
            word_wrap
        });
    }

    async save() {
        let url;

        if (this.props.hash) {
            url = '/snippets/edit/' + this.props.hash;
        } else {
            url = '/snippets';
        }

        let res = await axios.post(url, {
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
                            <select
                                onChange={this.change_language}
                                defaultValue={this.state.language}
                                class="form-control"
                            >
                                <option>apex</option>
                                <option>azcli</option>
                                <option>bat</option>
                                <option>c</option>
                                <option>clojure</option>
                                <option>coffeescript</option>
                                <option>cpp</option>
                                <option>csharp</option>
                                <option>csp</option>
                                <option>css</option>
                                <option>dockerfile</option>
                                <option>fsharp</option>
                                <option>go</option>
                                <option>handlebars</option>
                                <option>html</option>
                                <option>ini</option>
                                <option>java</option>
                                <option>javascript</option>
                                <option>json</option>
                                <option>less</option>
                                <option>lua</option>
                                <option>markdown</option>
                                <option>msdax</option>
                                <option>mysql</option>
                                <option>objective-c</option>
                                <option>perl</option>
                                <option>pgsql</option>
                                <option>php</option>
                                <option>plaintext</option>
                                <option>postiats</option>
                                <option>powerquery</option>
                                <option>powershell</option>
                                <option>pug</option>
                                <option>python</option>
                                <option>r</option>
                                <option>razor</option>
                                <option>redis</option>
                                <option>redshift</option>
                                <option>ruby</option>
                                <option>rust</option>
                                <option>sb</option>
                                <option>scheme</option>
                                <option>scss</option>
                                <option>shell</option>
                                <option>sol</option>
                                <option>sql</option>
                                <option>st</option>
                                <option>swift</option>
                                <option>typescript</option>
                                <option>vb</option>
                                <option>xml</option>
                                <option>yaml</option>
                            </select>
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
                            <button
                                type="button"
                                title="Save the snippet"
                                class="btn btn-md btn-success control-button"
                                onClick={this.save}
                            >
                                <i class="fas fa-save"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div id="editor"></div>
            </div>
        );
    }
}

Util.try_render('react_manage_snippet', ManageSnippet);

export default ManageSnippet;
