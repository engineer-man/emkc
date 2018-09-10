class Tags extends React.Component {

    render() {
        return (
            this.props.tags &&
            this.props.tags.map(tag => <Tag key={tag.tag_id} tag={tag} handle_tag_remove={this.props.handle_tag_remove} /> )
        )
    }

}
