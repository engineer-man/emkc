const fs = require('fs');
const moment = require('moment');

module.exports = {

    now() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    },

    slugify(string) {
        return (string + '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 ]+/g, '')
            .replace(/ +/g, '-')
            .replace(/^[\s\-]+/gi, '')
            .replace(/[\s\-]+$/gi, '');
    },

    time_diff(start_date, end_date) {
        var diff = parse_int(end_date.diff(start_date) / 1000);

        var days = diff / 60 / 60 / 24;
        var hours = diff / 60 / 60;
        var minutes = diff / 60;
        var seconds = diff;

        var time, unit;

        for (; ;) {
            if (hours >= 24) { time = Math.round(days); break; }
            if (minutes >= 60) { time = Math.round(hours); break; }
            if (seconds >= 60) { time = Math.round(minutes); break; }

            time = seconds >= 0 ? seconds : 0; break;
        }

        for (; ;) {
            if (hours >= 24) { unit = 'days'; break; }
            if (minutes >= 60) { unit = 'hours'; break; }
            if (seconds >= 60) { unit = 'minutes'; break; }

            unit = 'seconds'; break;
        }

        if (unit === 'days' && time > 30) {
            var months = Math.round(time / 30);
            if (months === 1) {
                return '1 month';
            } else {
                return months + ' months';
            }
        }

        if (time === 1) {
            return time + ' ' + unit.slice(0, -1);
        } else {
            return time + ' ' + unit;
        }
    },

    time_ago(the_time) {
        var start_date = moment(the_time);
        var end_date = moment();

        return this.time_diff(start_date, end_date);
    },

    bury_upload(file) {
        if (!file) return null;

        file
            .upload({dirname: '/tmp'}, (err, files) => {
                files.for_each(file => {
                    fs.unlink(file.fd);
                });
            });
    }

};
