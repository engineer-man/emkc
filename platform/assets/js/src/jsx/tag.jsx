class Tag extends React.Component {

    render() {
        return (
            <span data-id={this.props.tag.tag_id} class="badge badge-info">
                {this.props.tag.name}
                {
                    this.props.tag.is_removable
                        ? <i class="fa fa-times" onClick={this.props.handle_tag_remove}></i>
                        : null
                }
            </span>
        )
    }

}
