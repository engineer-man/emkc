class Tag extends React.Component {

    render() {
        return (
            <span class="badge badge-info">
                {this.props.tag.name}
            </span>
        )
    }

}
