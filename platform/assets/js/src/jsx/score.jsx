class Score extends React.Component {
    render() {
        return (
            <div class="scores">
                <i class="fa fa-chevron-up"></i>
                <div class="f700">
                    {this.props.score}
                </div>
                <i class="fa fa-chevron-down"></i>
            </div>
        )
    }
}
