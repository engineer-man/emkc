module.exports = {

    async create(req, res) {
        if (req.method === 'POST') {
            const {question_id, parent_id, comment} = req.body;

            try {
                if (comment === '{"ops":[{"insert":"\\n"}]}') {
                    throw new Error('Please type a comment');
                }

                let base_id = await db.comments
                    .resolve_base_id(parent_id);

                let parent = await db.comments
                    .find_one({
                        where: {
                            comment_id: parent_id
                        }
                    });

                let comment = await db.comments
                    .create({
                        question_id,
                        base_id,
                        parent_id,
                        user_id: req.glob.user_id,
                        comment,
                        depth: parent ? parent.depth + 1 : 0
                    });

                comment = await db.comments
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

                return res.send({
                    status: 'ok',
                    payload: {
                        comment: {
                            depth: comment.depth,
                            comment_id: comment.comment_id,
                            question_id: comment.question_id,
                            user_id: comment.user_id,
                            comment: comment.comment,
                            score: comment.score,
                            created_at: comment.created_at,
                            time_ago: 'now',
                            username: comment.user.username,
                            display_name: comment.user.display_name,
                            avatar_url: constant.cdn_url + comment.user.avatar_url,
                            value: null,
                            comments: []
                        }
                    }
                });
            } catch (e) {
                return res.send({
                    status: 'error',
                    payload: {
                        message: e.message
                    }
                });
            }
        }

        return res.view();
    },

    async save(req, res) {
        const comment_id = req.body.comment_id;
        const commentt = req.body.comment;

        let comment = await db.comments
            .find_one({
                where: {
                    comment_id
                }
            });

        try {
            if ((!comment || comment.user_id !== req.glob.user_id) &&
                !req.glob.user.is_staff) {

                throw new Error('Question not found');
            }

            if (comment === '{"ops":[{"insert":"\\n"}]}') {
                throw new Error('Please type a comment');
            }

            comment.comment = commentt;

            await comment
                .save();

            return res.send({
                status: 'ok'
            });
        } catch (e) {
            return res.send({
                status: 'error',
                payload: {
                    message: e.message
                }
            });
        }
    }

};
