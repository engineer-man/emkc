class Tags extends React.Component {

    render() {
        return (
            this.props.tags &&
            this.props.tags.map(tag => <Tag tag={tag} /> )
        )
    }

}
