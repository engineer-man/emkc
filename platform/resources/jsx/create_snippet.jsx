import React from 'react';
import axios from 'axios';

import Util from 'js/util';

class CreateSnippet extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            snip: '',
            language: 'javascript'
        };

        this.change_language = this.change_language.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.state.editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'em',
            language: this.state.language,
            automaticLayout: true,
            fontSize: 16
        });
    }

    change_language(event) {
        this.setState({
            language: event.target.value
        });

        monaco.editor.setModelLanguage(this.state.editor.getModel(), event.target.value);
    }

    async save() {
        let res = await axios
            .post('/snippets', {
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
            <div class="em_create_snippet">
                <div class="menu">
                    <div class="wrapper">
                        <div class="language">
                            <select onChange={this.change_language} defaultValue="javascript" class="form-control">
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
                        <div class="save">
                            <button type="button" class="btn btn-md btn-success" onClick={this.save}>Save</button>
                        </div>
                    </div>
                </div>
                <div id="editor"></div>
            </div>
        )
    }

}

Util.try_render('react_create_snippet', CreateSnippet);

export default CreateSnippet;
