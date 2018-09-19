class Score extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            score: props.score,
            value: props.value
        };

        this.vote = this.vote.bind(this);
    }

    vote(mode) {
        const url = '/votes/handle/' + this.props.mode + '/' + this.props.pk;

        const pk = this.props.pk;

        let value;
        let change;

        if (this.state.value === 1) {
            value = mode === 'u' ? null : -1;
            change = mode === 'u' ? -1 : -2;
        }
        if (this.state.value === null) {
            value = mode === 'u' ? 1 : -1;
            change = mode === 'u' ? 1 : -1;
        }
        if (this.state.value === -1) {
            value = mode === 'u' ? 1 : null;
            change = mode === 'u' ? 2 : 1;
        }

        this.setState(prev => {
            return {
                value,
                score: prev.score + change
            };
        });

        return axios
            .post(url, {
                pk,
                value
            })
            .then(res => {
                if (res.data.status === 'error') {
                    return bootbox.alert(res.data.payload.message);
                }
            });
    }

    render() {
        return (
            <div class="scores">
                <i class={'fa fa-chevron-up ' + (this.state.value === 1 ? 'active' : '')} onClick={() => this.vote('u')}></i>
                <div class="f700">
                    {this.state.score > 0 ? this.state.score : 0}
                </div>
                <i class={'fa fa-chevron-down ' + (this.state.value === -1 ? 'active' : '')} onClick={() => this.vote('d')}></i>
            </div>
        )
    }

}
