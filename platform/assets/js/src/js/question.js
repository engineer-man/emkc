class em_question {

    constructor(ops) {
        this.question_id = null;
        this.quill = new Quill('#question', {
            theme: 'snow',
            placeholder: 'Compose your question here',
            modules: {
                syntax: true,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            }
        });

        if (ops) {
            this.quill.setContents(ops);
        }
    }

    create() {
        this.save('/questions/ask');
    }

    edit() {
        this.save('/questions/edit/' + this.question_id);
    }

    save(url) {
        const title = $('#title').val();
        const question = JSON.stringify(this.quill.getContents());
console.log(url)
        return axios
            .post(url, {
                title,
                question
            })
            .then(res => {
                if (res.data.status === 'error') {
                    // do bootbox stuff
                    return;
                }

                location = res.data.payload.url;
            });
    }

}
