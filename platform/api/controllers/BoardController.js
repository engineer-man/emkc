module.exports = {

    home(req, res) {
        return Promise.resolve(null)
            .then(() => {
                return [
                    db.questions
                        .find_all({
                            include: [
                                {
                                    model: db.users,
                                    as: 'user'
                                },
                                {
                                    model: db.tags,
                                    as: 'tags'
                                }
                            ],
                            order: [
                                ['question_id', 'desc']
                            ],
                            limit: 50
                        }),
                    db.users
                        .find_all({
                            order: [
                                ['score', 'desc'],
                                ['user_id']
                            ],
                            limit: 50
                        })
                ];
            })
            .spread((questions, users) => {
                return res.view({
                    questions: questions.map(q => {
                        return {
                            title: q.title,
                            score: q.score,
                            views: q.views,
                            comments: q.comments,
                            url: q.url,
                            time_ago: q.time_ago,
                            user: {
                                display_name: q.user.display_name,
                                avatar_url: constant.gcloud_base_url + q.user.avatar_url,
                                score: q.user.score
                            },
                            tags: q.tags
                        }
                    }),
                    users
                });
            });
    },

    _config: {}

};
