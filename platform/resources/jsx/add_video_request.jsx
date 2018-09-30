class AddVideoRequest extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            requests: props.requests,
            name: ''
        };

        this.update_data = this.update_data.bind(this);
        this.add_request = this.add_request.bind(this);
        this.vote = this.vote.bind(this);
    }

    update_data(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    add_request() {
        return axios
            .post('/community/add_video_request', {
                name: this.state.name
            })
            .then(res => {
                if (res.data.status === 'error') {
                    return bootbox.alert(res.data.payload.message);
                }

                location = location;
            });
    }

    vote(request) {
        var requests = this.state.requests
            .map(r => {
                if (r.video_request_id === request.video_request_id) {
                    r.vote = r.vote ? null : { user_id: ctx.user_id }
                }

                return r;
            });

        this.setState({
            requests
        });

        return axios
            .post('/community/video_request_vote', {
                video_request_id: request.video_request_id
            });
    }

    render() {
        return (
            <div class="em_video_requests">
                {
                    ctx.user_id
                        ?
                        <div class="form-box">
                            <div class="form-group">
                                <label class="f700">Add Request</label>
                                <input
                                    type="text"
                                    id="name"
                                    class="form-control"
                                    placeholder="Title your topic here"
                                    autocomplete="off"
                                    onChange={this.update_data} />
                            </div>
                            <div class="form-group marginbottom0">
                                <button
                                    type="button"
                                    class="btn btn-sm btn-success"
                                    onClick={this.add_request}>Add</button>
                            </div>
                        </div>
                        :
                        null
                }

                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th class="width-60"></th>
                            <th class="width-80 center">Votes</th>
                            <th>Video</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.requests.map(request => {
                                return (
                                    <tr key={request.video_request_id}>
                                        <td
                                            class={'vote_cell center ' + (request.vote && request.vote.user_id === ctx.user_id ? 'active' : '') }
                                            onClick={() => ctx.user_id ? this.vote(request) : login.open() }>
                                            <i class="fa fa-check"></i>
                                        </td>
                                        <td class="center">{request.votes.length}</td>
                                        <td>{request.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}
