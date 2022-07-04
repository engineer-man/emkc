const request = require('request-promise');

module.exports = {
    lane_main: 'main',

    job_test: 'test',

    /**
     * dispenserd.schedule(dispenserd.job_test, {
     *     key: 'value'
     * });
     */
    schedule(job, options) {
        options.job = job;

        request
            .post({
                url:
                    'http://' + sails.config.dispenserd.host + ':8282/schedule',
                body: JSON.stringify({
                    lane: options.lane || dispenserd.lane_main,
                    priority: options.priority || 10000,
                    message: JSON.stringify(options)
                }),
                resolveWithFullResponse: true,
                simple: false
            })
            .catch((err) => {
                console.log('job failed to schedule');
            });
    }
};
