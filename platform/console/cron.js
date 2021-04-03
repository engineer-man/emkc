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
            let total_score = 0;

            // process points from challenges
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

            let challenges_score = challenges
                .reduce((i, c) => i + c.challenge.points, 0);

            total_score += challenges_score;

            // process points from awards
            let awards = await db.awards
                .find_all({
                    where: {
                        user_id: user.user_id
                    }
                });

            let awards_score = awards
                .reduce((i, a) => i + a.points, 0);

            total_score += awards_score;

            // sync score and apply to discord as appropriate
            user.score = total_score;

            if (!user.discord_api) {
                return await user.save();
            }

            // test for and assign novice role
            if (user.discord_rank === null && user.score >= 40) {
                try {
                    await discord
                        .api(
                            'put',
                            `/guilds/473161189120147456/members/${user.discord_api}` +
                            `/roles/${constant.roles.emkc_novice}`
                        );
                    user.discord_rank = 1;
                } catch (e) {}

                await timeout(1000);
            }

            // test for and assign hero role
            if (user.discord_rank === 1 && user.score >= 300) {
                try {
                    await discord
                        .api(
                            'put',
                            `/guilds/473161189120147456/members/${user.discord_api}` +
                            `/roles/${constant.roles.emkc_hero}`
                        );
                    user.discord_rank = 2;
                } catch (e) {}

                await timeout(1000);
            }

            // test for and assign master role
            if (user.discord_rank === 2 && user.score >= 1000) {
                try {
                    await discord
                        .api(
                            'put',
                            `/guilds/473161189120147456/members/${user.discord_api}` +
                            `/roles/${constant.roles.emkc_master}`
                        );
                    user.discord_rank = 3;
                } catch (e) {}

                await timeout(1000);
            }

            // test for and assign legend role
            if (user.discord_rank === 3 && user.score >= 5000) {
                try {
                    await discord
                        .api(
                            'put',
                            `/guilds/473161189120147456/members/${user.discord_api}` +
                            `/roles/${constant.roles.emkc_legend}`
                        );
                    user.discord_rank = 4;
                } catch (e) {}

                await timeout(1000);
            }

            await user.save();
        }
    },

    async process_awards() {
        await db.awards
            .destroy({
                where: {}
            });

        // process contest related awards
        let contests = await db.contests
            .find_all({
                where: {
                    end_date: {
                        [$lt]: util.now()
                    },
                    contest_id: {
                        [$not_id]: [30]
                    }
                },
                include: [
                    {
                        model: db.contest_submissions,
                        as: 'submissions',
                        where: {
                            late: false
                        },
                        include: [
                            {
                                model: db.users,
                                as: 'user'
                            }
                        ]
                    }
                ],
                order: [
                    [{ model: db.contest_submissions, as: 'submissions' }, 'length'],
                    [{ model: db.contest_submissions, as: 'submissions' }, 'created_at'],
                ]
            });

        for (const contest of contests) {
            // handle 1st-3rd place
            let placed = [...new Set(contest.submissions.map(s => s.user_id))].slice(0, 3);

            let i = 1;

            for (const user_id of placed) {
                let type = {
                    1: constant.awards.type.contest_first_overall,
                    2: constant.awards.type.contest_second_overall,
                    3: constant.awards.type.contest_third_overall,
                }[i];

                await db.awards
                    .create({
                        type,
                        user_id,
                        ref_type: constant.awards.ref_type.contests,
                        ref_id: contest.contest_id,
                        points: {
                            [constant.awards.type.contest_first_overall]: 500,
                            [constant.awards.type.contest_second_overall]: 200,
                            [constant.awards.type.contest_third_overall]: 75,
                        }[type]
                    });

                ++i;
            }

            // handle per language
            let languages = [];

            for (const submission of contest.submissions) {
                if (languages.includes(submission.language)) {
                    continue;
                }

                await db.awards
                    .create({
                        type: constant.awards.type.contest_first_language,
                        user_id: submission.user_id,
                        ref_type: constant.awards.ref_type.contests,
                        ref_id: contest.contest_id,
                        points: 50
                    });

                languages.push(submission.language);
            }

            // handle participation
            let participants = [...new Set(contest.submissions.map(s => s.user_id))];

            for (const user_id of participants) {
                await db.awards
                    .create({
                        type: constant.awards.type.general_participation,
                        user_id,
                        ref_type: constant.awards.ref_type.contests,
                        ref_id: contest.contest_id,
                        points: 50
                    });
            }
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
                            [$in]: users
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
    },

    async contest_status() {
        let contest = await db.contests
            .find_one({
                where: {
                    draft: 0,
                    start_date: {
                        [$lte]: util.now()
                    },
                    end_date: {
                        [$gte]: util.now()
                    }
                },
                include: [
                    {
                        model: db.contest_submissions,
                        as: 'submissions',
                        include: [
                            {
                                model: db.users,
                                as: 'user'
                            }
                        ]
                    }
                ],
                order: [
                    ['contest_id', 'desc'],
                    [{ model: db.contest_submissions, as: 'submissions' }, 'length'],
                    [{ model: db.contest_submissions, as: 'submissions' }, 'created_at']
                ]
            });

        if (!contest || contest.submissions.length === 0) {
            return;
        }

        let submission = contest.submissions[0];

        discord
            .api('post', `/channels/${constant.channels.emkc}/messages`, {
                embed: {
                    //title: contest.name,
                    description:
                        'This contest is active right now. Submit your solution soon and ' +
                        'try to beat the best solution! ' +
                        `[Click here](${constant.base_url}${contest.url}) to give it a try.`,
                    type: 'rich',
                    color: 0x84e47f,
                    url: `${constant.base_url}${contest.url}`,
                    thumbnail: {
                        url: constant.cdn_url + submission.user.avatar_url
                    },
                    fields: [
                        {
                            name: '**leader**',
                            value: submission.user.display_name,
                            inline: true
                        },
                        {
                            name: '**language used**',
                            value: submission.language,
                            inline: true
                        },
                        {
                            name: '**length**',
                            value: submission.length,
                            inline: true
                        }
                    ],
                    author: {
                        name: 'Contest Status: ' + contest.name,
                        icon_url: 'https://emkc.org/images/icon_circle_64.png'
                    },
                    footer: {
                        text: `There's still ${contest.time_left}left to submit a solution`
                    }
                }
            })
            .catch(err => {});
    }

};

var method = process.argv[2]
    .replace(/-/gi, '_')
    .replace(/^_+/gi, '');

cron[method]();
