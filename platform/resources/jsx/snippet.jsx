class Snippet extends React.Component {

    componentDidMount() {
        monaco.editor.create(document.getElementById('editor'), {
            theme: 'em',
            value: this.props.snip,
            language: this.props.language,
            automaticLayout: true,
            fontSize: 16,
            readOnly: true
        });
    }

    render() {
        return (
            <div class="em_snippet_view">
                <div class="menu">
                    <div class="wrapper">
                        <span class="language_label f700">Language:</span>
                        {this.props.language}
                    </div>
                </div>
                <div id="editor"></div>
            </div>
        )
    }

}
