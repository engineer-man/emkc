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
                            if (user.discord_api && user.discord_rank === 2 && user.score >= 1000) {
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
                            if (user.discord_api && user.discord_rank === 3 && user.score >= 5000) {
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
    },

    async repair_roles() {
        const timeout = ms => new Promise(res => setTimeout(res, ms));

        const update_role = async (user, role) => {
            console.log('assigning ' + user.username + ' ' + role);

            let res = await discord.api('put',
                '/guilds/'+constant.server_id+
                '/members/'+user.discord_api+
                '/roles/'+role);

            if (res.statusCode === 429) {
                let retry_after = res.body.retry_after;

                console.log('rate limited, waiting: ' + retry_after);

                await timeout(retry_after);
                await update_role(user, role);
            }
        };

        let users = await db.users
            .find_all();

        for (const user of users) {
            // member role
            if (user.discord_api) {
                await update_role(user, constant.roles.emkc_member);
            }

            // novice role
            if (user.discord_api && user.discord_rank === 1) {
                await update_role(user, constant.roles.emkc_novice);
            }

            // hero role
            if (user.discord_api && user.discord_rank === 2) {
                await update_role(user, constant.roles.emkc_hero);
            }

            // master role
            if (user.discord_api && user.discord_rank === 3) {
                await update_role(user, constant.roles.emkc_master);
            }

            // legend role
            if (user.discord_api && user.discord_rank === 4) {
                await update_role(user, constant.roles.emkc_legend);
            }
        }
    }

};

var method = process.argv[2]
    .replace(/-/gi, '_')
    .replace(/^_+/gi, '');

cron[method]();
