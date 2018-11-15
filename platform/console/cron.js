#!/usr/bin/env node
require('./common');

const moment = require('moment');
const request = require('request-promise');

var cron = {

    calculate_score() {
        return db.users
            .find_all()
            .then(users => {
                var chain = Promise.resolve(null);

                users.for_each(user => {
                    chain = chain
                        .then(() => {
                            return [
                                db.questions
                                    .sum('score', {
                                        where: {
                                            user_id: user.user_id
                                        }
                                    }),
                                db.comments
                                    .sum('score', {
                                        where: {
                                            user_id: user.user_id
                                        }
                                    }),
                                db.user_challenges
                                    .find_all({
                                        where: {
                                            user_id: user.user_id
                                        },
                                        include: [
                                            {
                                                model: db.challenges,
                                                as: 'challenge'
                                            }
                                        ]
                                    })
                                    .then(challenges => {
                                        return challenges.reduce((i, c) => i + c.challenge.points, 0);
                                    })
                            ];
                        })
                        .spread((score1, score2, score3) => {
                            score1 = score1 || 0;
                            score2 = score2 || 0;
                            score3 = score3 || 0;

                            user.score = score1 + score2 + score3;

                            return user
                                .save();
                        });
                });

                return chain;
            });
    }

};

var method = process.argv[2]
    .replace(/-/gi, '_')
    .replace(/^_+/gi, '');

cron[method]();
