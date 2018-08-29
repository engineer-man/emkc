const q = require('q');

module.exports = {

    home(req, res) {
        return db.questions
            .find_all({
                order: [
                    ['question_id', 'desc']
                ]
            })
            .then(questions => {
                return res.view({
                    questions
                });
            });
    },

    _config: {}

};
