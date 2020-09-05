const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    return sequelize
        .define('contests', {
            contest_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            draft: DataTypes.INTEGER,
            name: DataTypes.STRING,
            description: DataTypes.TEXT('medium'),
            start_date: DataTypes.DATE,
            end_date: DataTypes.DATE,
            input: DataTypes.TEXT,
            output: DataTypes.TEXT,
            created_at: DataTypes.DATE
        },
        {
            freezeTableName: true,

            getterMethods: {
                active() {
                    return moment().isAfter(moment(this.start_date)) && moment().isBefore(moment(this.end_date));
                },

                url() {
                    return '/contests/' + this.contest_id + '/' + util.slugify(this.name);
                },

                slug() {
                    return util.slugify(this.title)
                },

                time_left() {
                    const start = moment().unix();
                    const end = moment(this.end_date).unix();
                    const diff = end - start;
                    const duration = moment.duration(diff * 1000, 'milliseconds');

                    if (duration.weeks() > 0) {
                        return duration.weeks() + ' week' + (duration.weeks() == 1 ? '' : 's') + ' ' +
                            duration.days() + ' day' + (duration.days() == 1 ? '' : 's') + ' ' +
                            duration.hours() + ' hour' + (duration.hours() == 1 ? '' : 's') + ' ' +
                            duration.minutes() + ' minute' + (duration.minutes() == 1 ? '' : 's') + ' ';
                    }

                    if (duration.days() > 0) {
                        return duration.days() + ' day' + (duration.days() == 1 ? '' : 's') + ' ' +
                            duration.hours() + ' hour' + (duration.hours() == 1 ? '' : 's') + ' ' +
                            duration.minutes() + ' minute' + (duration.minutes() == 1 ? '' : 's') + ' ';
                    }

                    if (duration.hours() > 0) {
                        return duration.hours() + ' hour' + (duration.hours() == 1 ? '' : 's') + ' ' +
                            duration.minutes() + ' minute' + (duration.minutes() == 1 ? '' : 's') + ' ';
                    }

                    return duration.minutes() + ' minute' + (duration.minutes() == 1 ? '' : 's') + ' ';
                }
            }
        }
    );
};
