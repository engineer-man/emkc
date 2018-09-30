module.exports = {

    home(req, res) {
        return res.view();
    },

    about(req, res) {
        return res.view();
    },

    power(req, res) {
        return res.view();
    },

    video_requests(req, res) {
        return db.video_requests
            .find_all({
                include: [
                    {
                        required: false,
                        model: db.video_request_votes,
                        as: 'vote',
                        where: {
                            user_id: req.glob.user_id
                        }
                    },
                    {
                        model: db.video_request_votes,
                        as: 'votes'
                    }
                ]
            })
            .then(requests => {
                requests.sort((a,b) => a.votes.length > b.votes.length ? -1 : 1);

                return res.view({
                    requests
                });
            });
    },

    add_video_request(req, res) {
        const { name } = req.body;

        return db.video_requests
            .find_one({
                where: {
                    name
                }
            })
            .then(request => {
                if (request)
                    throw new Error('Video already exists');
                if (!name)
                    throw new Error('Please supply a video to request');

                return db.video_requests
                    .create({
                        user_id: req.glob.user_id,
                        name
                    });
            })
            .then(() => {
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
    },

    video_request_vote(req, res) {
        const { video_request_id } = req.body;

        return db.video_request_votes
            .find_one({
                where: {
                    video_request_id,
                    user_id: req.glob.user_id
                }
            })
            .then(vote => {
                if (vote) return vote.destroy();

                return db.video_request_votes
                    .create({
                        video_request_id,
                        user_id: req.glob.user_id
                    });
            })
            .then(() => {
                return res.send({
                    status: 'ok'
                });
            })
            .catch(err => {
                return res.send({
                    status: 'error',
                    payload: {
                        message: 'There was a problem recording your vote'
                    }
                });
            });
    },

    _config: {}

};
