class Snippet extends React.Component {

    componentDidMount() {
        $('.highlightjs').each((i, block) => {
            hljs.highlightBlock(block);
        });
    }

    render() {
        return (
            <div class="em_snippet_create">
                <div class="contents">
                    <div class="col1_padding">
                        <h5 class="f700">Contents</h5>
                        <div class="highlightjs">
                            {this.props.snip}
                        </div>
                    </div>
                </div>
                <div class="notes">
                    <div class="col2_padding">
                        <h5 class="f700">Discussion?</h5>
                        <p>
                            I dunno yet
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}
