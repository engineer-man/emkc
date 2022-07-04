import React from 'react';

import Util from 'js/util';

class CliScript extends React.Component {
    componentDidMount() {
        let editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'em',
            value: this.props.content,
            language: 'shell',
            automaticLayout: true,
            fontSize: 16,
            readOnly: true,
            wordWrap: 'off',
            scrollBeyondLastLine: false,
            scrollbar: {
                vertical: 'hidden'
            },
            minimap: {
                enabled: false
            }
        });

        document.getElementById('editor').style.height =
            editor.getModel().getLineCount() * 22 + 'px';
    }

    render() {
        return <div id="editor"></div>;
    }
}

Util.try_render('react_cli_script', CliScript);

export default CliScript;
