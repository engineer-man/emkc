const fs = require('fs');
const q = require('q');

module.exports = {

    async ask(req, res) {
        if (req.method === 'POST') {
            const { title, question, tags } = req.body;

            try {
                if (!title || !question || tags.length === 0) {
                    throw new Error('Please fill out a title, question, and choose some tags');
                }

                let question = await db.questions
                    .create({
                        user_id: req.glob.user_id,
                        title,
                        question,
                        question_tags: tags.map(tag => {
                            return {
                                tag_id: tag.tag_id
                            }
                        })
                    }, {
                        include: [
                            {
                                model: db.question_tags,
                                as: 'question_tags'
                            }
                        ]
                    });

                return res.send({
                    status: 'ok',
                    payload: {
                        url: question.url
                    }
                });
            } catch(e) {
                return res.send({
                    status: 'error',
                    payload: {
                        message: err.message
                    }
                });
            }
        }

        return res.view();
    },

    async edit(req, res) {
        const question_id = req.params.question_id;

        let question = await db.questions
            .find_one({
                where: {
                    question_id
                },
                include: [
                    {
                        model: db.tags,
                        as: 'tags'
                    }
                ]
            });

        try {
            if ((!question || question.user_id !== req.glob.user_id) &&
                !req.glob.user.is_staff) {

                throw new Error('Question not found');
            }

            if (req.method === 'POST') {
                const title = req.body.title;
                const questionn = req.body.question;
                const tags = req.body.tags;

                if (!title || !questionn || tags.length === 0) {
                    return res.send({
                        status: 'error',
                        payload: {
                            message: 'Please fill out a title, question, and choose some tags'
                        }
                    });
                }

                question.title = title;
                question.question = questionn;

                await question
                    .save();

                await db.question_tags
                    .destroy({
                        where: {
                            question_id
                        }
                    });

                await db.question_tags
                    .bulk_create(tags.map(tag => {
                        return {
                            question_id,
                            tag_id: tag.tag_id
                        }
                    }));

                return res.send({
                    status: 'ok',
                    payload: {
                        url: question.url
                    }
                });
            }

            return res.view({
                question
            });
        } catch(e) {
            return res.redirect('/board');
        }
    },

    async view(req, res) {
        let question_id = req.params.question_id;
        let name = req.params.name;

        let question = await db.questions
            .find_one({
                where: {
                    question_id
                },
                include: [
                    {
                        model: db.users,
                        as: 'user'
                    },
                    {
                        model: db.tags,
                        as: 'tags'
                    },
                    {
                        required: false,
                        model: db.question_votes,
                        as: 'vote',
                        where: {
                            user_id: req.glob.user_id
                        }
                    }
                ]
            });

        try {
            if (!question) throw new Error('Question not found');

            question.user = {
                username: question.user.username,
                display_name: question.user.display_name,
                avatar_url: constant.cdn_url + question.user.avatar_url,
            };

            if (question.slug !== name) {
                res.redirect(question.url);
                throw null;
            }

            let [ rows ] = await db.sequelize
                .query(
                    require('fs')
                        .read_file_sync(root_dir + '/platform/models/sql/question.sql')
                        .to_string()
                        .replace(/__question_id__/gi, question_id)
                        .replace(/__user_id__/gi, req.glob.user_id || null)
                        .replace(/__limit__/gi, 10)
                );

            let comments = [];
            let comment_ids = [];

            // add base comments
            let comment_id = null;

            rows.for_each(row => {
                if (~comment_ids.index_of(row.c1_comment_id)) return null;

                comment_ids.push(row.c1_comment_id);

                comments.push({
                    depth: 0,
                    comment_id: row.c1_comment_id,
                    question_id: row.c1_question_id,
                    user_id: row.c1_user_id,
                    comment: row.c1_comment,
                    score: row.c1_score,
                    created_at: row.c1_created_at,
                    time_ago: util.time_ago(row.c1_created_at),
                    username: row.c1_username,
                    display_name: row.c1_display_name,
                    avatar_url: constant.cdn_url + row.c1_avatar_url,
                    value: row.c1_value,
                    comments: []
                });
            });

            // add nested comments recursively to base comments
            let process_comments = (comments, depth) => {
                comments.for_each(comment => {
                    comment.comments = rows
                        .filter(row => {
                            if (depth === 1)
                                return row.c2_depth === depth && comment.comment_id === row.c2_base_id
                            return row.c2_depth === depth && comment.comment_id === row.c2_parent_id
                        })
                        .map(row => {
                            return {
                                depth: row.c2_depth,
                                comment_id: row.c2_comment_id,
                                question_id: row.c2_question_id,
                                parent_id: row.c2_parent_id,
                                user_id: row.c2_user_id,
                                comment: row.c2_comment,
                                score: row.c2_score,
                                created_at: row.c2_created_at,
                                time_ago: util.time_ago(row.c2_created_at),
                                username: row.c2_username,
                                display_name: row.c2_display_name,
                                avatar_url: constant.cdn_url + row.c2_avatar_url,
                                value: row.c2_value,
                                comments: []
                            }
                        });

                    if (comment.comments.length > 0) {
                        process_comments(comment.comments, depth + 1);
                    }
                });
            };

            process_comments(comments, 1);

            return res.view({
                question,
                comments: JSON.stringify(comments)
            });
        } catch(e) {
            if (e) {
                return res.redirect('/board');
            }
        }
    }

};
