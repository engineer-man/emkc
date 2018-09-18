class UserPreferences extends React.Component {
      
    constructor(props) {
        super(props)
        console.log(props);
        /*this.state = {
            snip: ''
        };

        this.change = this.change.bind(this);
        this.save = this.save.bind(this);*/
    }

    change(event) {
       /* this.setState({
            snip: event.target.value
        });*/
    }

    save() {
        /*const { snip } = this.state;

        return axios
            .post('/snippets', {
                snip
            })
            .then(res => {
                if (res.data.status === 'error') {
                    return bootbox.alert('Please provide some code');
                }

                location = res.data.payload.url;


                <img src={{ sails.glob.constant.gcloud_base_url }}{{ user.avatar_url }} style="width: 128px; height: auto;" />


            });*/
    }

    render() {
        return (
            <div class="user_preferences">
                <h4 class="f700">{ this.props.user.display_name }</h4>
                <h4 class="f900"><i class="fa fa-bolt"></i> { this.props.user.score }</h4>
            </div>
        )
    }

}
