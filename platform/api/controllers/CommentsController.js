module.exports = {

    create(req, res) {
        if (req.method === 'POST') {
            const {question_id, parent_id, comment} = req.body;

            return Promise.resolve(null)
                .then(() => {
                    if (comment === '{"ops":[{"insert":"\\n"}]}') {
                        throw new Error('Please type a comment');
                    }

                    return [
                        db.comments
                            .resolve_base_id(parent_id),
                        db.comments
                            .find_one({
                                where: {
                                    comment_id: parent_id
                                }
                            })
                    ];
                })
                .spread((base_id, parent) => {
                    return db.comments
                        .create({
                            question_id,
                            base_id,
                            parent_id,
                            user_id: req.glob.user_id,
                            comment,
                            depth: parent ? parent.depth + 1 : 0
                        })
                        .then(comment => {
                            return db.comments
                                .find_one({
                                    where: {
                                        comment_id: comment.comment_id
                                    },
                                    include: [
                                        {
                                            model: db.users,
                                            as: 'user'
                                        }
                                    ]
                                });
                        })
                })
                .then(comment => {
                    return res.send({
                        status: 'ok',
                        payload: {
                            comment: {
                                depth: comment.depth,
                                comment_id: comment.comment_id,
                                question_id: comment.question_id,
                                comment: comment.comment,
                                score: comment.score,
                                created_at: comment.created_at,
                                time_ago: 'now',
                                username: comment.user.username,
                                display_name: comment.user.display_name,
                                avatar_url: constant.gcloud_base_url + comment.user.avatar_url,
                                value: null,
                                comments: []
                            }
                        }
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
