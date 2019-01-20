#!/usr/bin/env node
require('./common');

const moment = require('moment');
const request = require('request-promise');

var cron = {

    calculate_score() {
        const timeout = ms => new Promise(res => setTimeout(res, ms));

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
                        .spread(async (score1, score2, score3) => {
                            score1 = score1 || 0;
                            score2 = score2 || 0;
                            score3 = score3 || 0;

                            user.score = score1 + score2 + score3;

                            // test for and assign novice role
                            if (user.discord_api && user.discord_rank === null && user.score >= 40) {
                                try {
                                    await discord.api('put',
                                        '/guilds/473161189120147456'+
                                        '/members/'+user.discord_api+
                                        '/roles/'+constant.roles.emkc_novice);
                                    user.discord_rank = 1;
                                } catch (e) {}
                                await timeout(1000);
                            }

                            // test for and assign hero role
                            if (user.discord_api && user.discord_rank === 1 && user.score >= 300) {
                                try {
                                    await discord.api('put',
                                        '/guilds/473161189120147456'+
                                        '/members/'+user.discord_api+
                                        '/roles/'+constant.roles.emkc_hero);
                                    user.discord_rank = 2;
                                } catch (e) {}
                                await timeout(1000);
                            }

                            // test for and assign master role
                            if (user.discord_api && user.discord_rank === 2 && user.score >= 2000) {
                                try {
                                    await discord.api('put',
                                        '/guilds/473161189120147456'+
                                        '/members/'+user.discord_api+
                                        '/roles/'+constant.roles.emkc_master);
                                    user.discord_rank = 3;
                                } catch (e) {}
                                await timeout(1000);
                            }

                            // test for and assign legend role
                            if (user.discord_api && user.discord_rank === 3 && user.score >= 10000) {
                                try {
                                    await discord.api('put',
                                        '/guilds/473161189120147456'+
                                        '/members/'+user.discord_api+
                                        '/roles/'+constant.roles.emkc_legend);
                                    user.discord_rank = 4;
                                } catch (e) {}
                                await timeout(1000);
                            }

                            await user.save();
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
