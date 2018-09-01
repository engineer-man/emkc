class Snippet extends React.Component {

    componentDidMount() {
        $('.highlightjs').each((i, block) => {
            hljs.highlightBlock(block);
            hljs.lineNumbersBlock(block);
        });
    }

    render() {
        return (
            <div class="em_snippet_view">
                <div class="contents">
                    <div class="col1_padding">
                        <h5 class="f700">Contents</h5>
                        <pre class="highlightjs">
                            {this.props.snip}
                        </pre>
                    </div>
                </div>
            </div>
        )
    }

}
