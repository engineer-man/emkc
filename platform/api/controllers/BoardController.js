module.exports = {

    async home(req, res) {
        let questions = await db.questions
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
                limit: 25
            });

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
                        username: q.user.username,
                        avatar_url: constant.gcloud_base_url + q.user.avatar_url,
                        score: q.user.score
                    },
                    tags: q.tags
                }
            })
        });
    }

};
