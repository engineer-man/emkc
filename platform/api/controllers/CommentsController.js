module.exports = {

    create(req, res) {
        if (req.method === 'POST') {
            const {question_id, parent_id, comment} = req.body;

            return Promise.resolve(null)
                .then(() => {
                    if (!comment) {
                        throw new Error('Please type a comment');
                    }

                    return Promise.all([
                        db.comments
                            .resolve_base_id(parent_id),
                        db.comments
                            .find_one({
                                where: {
                                    comment_id: parent_id
                                }
                            })
                    ]);
                })
                .then(results => {
                    const [base_id, parent] = results;

                    return db.comments
                        .create({
                            question_id,
                            base_id,
                            parent_id,
                            user_id: req.glob.user_id,
                            comment,
                            depth: parent ? parent.depth + 1 : 0
                        });
                })
                .then(comment => {
                    return res.send({
                        status: 'ok'
                    });
                })
                .catch(err => {
                    return res.send({
                        status: 'error',
                        payload: {
                            message: err.message
                        }
                    });
                });
        }

        return res.view();
    },

    _config: {}

};
