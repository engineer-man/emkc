#!/usr/bin/env node
require('./common');

const axios = require('axios');
const moment = require('moment');

const timeout = ms => new Promise(res => set_timeout(res, ms));

const cron = {

    async calculate_score() {
        let users = await db.users
            .find_all();

        for (const user of users) {
            let challenges = await db.user_challenges
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
                });

            let challenges_score = challenges.reduce((i, c) => i + c.challenge.points, 0);

            let score = challenges_score || 0;

            user.score = score;

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
        }
    },

    async update_staff() {
        await db.users
            .update(
                {
                    is_staff: 0
                },
                {
                    where: {}
                }
            );

        let users = [];
        let last_id = null;

        let base_url = `/guilds/${constant.server_id}/members?limit=1000`;

        while (true) {
            let result = await discord
                .api('get', base_url + (last_id ? '&after=' + last_id : ''));

            if (result.body.length === 0) {
                break;
            }

            users = users.concat(result.body);

            last_id = users.slice(-1)[0].user.id;

            await timeout(1200);
        }

        users = users
            .filter(user => {
                return user.roles.includes('473167481624854541');
            })
            .map(user => user.user.id);

        await db.users
            .update(
                {
                    is_staff: 1
                },
                {
                    where: {
                        discord_api: {
                            $in: users
                        }
                    }
                }
            );
    },

    async repair_roles() {
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
