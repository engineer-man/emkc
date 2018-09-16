class CodeRoom extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hash: props.hash,
            session: +new Date() + '.' + Math.random(),
            language: 'javascript',
            new_code: false,
            modifying: false,
            users: []
        };
    }

    componentDidMount() {
        var editor = monaco.editor.create(document.getElementById('editor'), {
            theme: 'vs-dark',
            value: this.props.code,
            language: this.state.language,
            automaticLayout: true,
            fontSize: 16,
            readOnly: this.props.read_only
        });

        axios
            .get('/coderoom/users/' + this.props.hash)
            .then(res => {
                this.setState({
                    users: res.data.payload.users.filter(user => user.user_id !== this.props.user_id)
                });
            });

        editor.onDidChangeModelContent(delta => {
            if (this.state.modifying) return null;

            this.setState({ new_code: true });

            io.socket.post(
                '/coderoom/sync',
                {
                    hash: this.state.hash,
                    session: this.state.session,
                    delta
                }
            );
        })

        setInterval(() => {
            if (!this.state.new_code) return null;

            return axios
                .post('/coderoom/save', {
                    hash: this.state.hash,
                    code: editor.getValue()
                })
                .then(() => {
                    this.setState({ new_code: false });
                });
        }, 1000);

        io.socket.on('coderoom_' + this.state.hash, data => {
            switch (data.action) {
                case 'join':
                    if (data.user_id === this.props.user_id) break;

                    this.setState(prev => {
                        return {
                            users: prev.users.concat([{
                                user_id: data.user_id,
                                display_name: data.display_name,
                                avatar_url: data.avatar_url
                            }])
                        }
                    });
                    break;
                case 'leave':
                    this.setState(prev => {
                        return {
                            users: prev.users.filter(user => user.user_id !== data.user_id)
                        }
                    });
                    break;
                case 'sync':
                    if (data.session === this.state.session) return null;

                    this.state.modifying = true;

                    data.delta.changes.forEach(change => {
                        var range = new monaco.Range(
                            change.range.startLineNumber,
                            change.range.startColumn,
                            change.range.endLineNumber,
                            change.range.endColumn);

                        // this is necessary to deal with monaco not allowing api edits in read only
                        var flip_ro = this.props.read_only;

                        if (flip_ro) editor.updateOptions({readOnly: false});

                        editor.executeEdits('/', [{
                            range,
                            text: change.text,
                            forceMoveMarkers: change.forceMoveMarkers
                        }]);

                        if (flip_ro) editor.updateOptions({readOnly: true});
                    });

                    this.state.modifying = false;
                    break;
            }
        });
    }

    render() {
        return (
            <div class="em_code_room">
                <div id="editor"></div>
                <div class="users">
                    {
                        this.state.users &&
                        this.state.users.map(user => <img key={user.user_id} src={user.avatar_url} />)
                    }
                </div>
            </div>
        )
    }

}
