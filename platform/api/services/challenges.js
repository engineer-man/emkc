const fs = require('fs');
const util = require('util');

const read_file = util.promisify(fs.read_file);

module.exports = {

    base_dir: root_dir + '/platform/resources/challenges',

    async get_tests(folder) {
        var tests = await read_file(this.base_dir + '/' + folder + '/tests.json');

        return JSON.parse(tests.to_string());
    }

};
