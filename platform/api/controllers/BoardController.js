const q = require('q');

module.exports = {

    home(req, res) {
        return db.questions
            .find_all()
            .then(questions => {
                return res.view({
                    questions
                });
            });
    },

    _config: {}

};
