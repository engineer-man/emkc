const axios = require('axios');

const timeout = ms => new Promise(res => set_timeout(res, ms));

module.exports = {

    async check_submission_validity(test_cases, expected_results, solution, language) {
        let counter = 0;

        while (counter < test_cases.length) {
            await timeout(constant.is_prod() ? 0 : 500);

            let current_test_case = test_cases[counter];
            let current_expected_result = expected_results[counter];

            let test_result = await axios
                ({
                    method: 'post',
                    url: constant.get_piston_url() + '/execute',
                    data: {
                        language,
                        source: solution,
                        args: current_test_case.trim().split('|')
                    }
                });

            if (test_result.data.output !== current_expected_result) {
                return false;
            }

            ++counter;
        }

        return true;
    }
}
