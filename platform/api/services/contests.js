const axios = require('axios');

const timeout = ms => new Promise(res => set_timeout(res, ms));

module.exports = {

    async check_submission_validity(test_cases, expected_results, solution, language, version) {
        let counter = 0;

        while (counter < test_cases.length) {
            await timeout(constant.is_prod() ? 0 : 500);

            let current_test_case = test_cases[counter];
            let current_expected_result = expected_results[counter];

            let args = current_test_case.trim().split('|');

            try {
                let test_result = await piston
                    .execute(
                        language,
                        solution,
                        args,
                        args.join('\n'),
                        version
                    );
            } catch (e) {
                return false;
            }

            if (test_result.run.stdout.trim() !== current_expected_result) {
                return false;
            }

            ++counter;
        }

        return true;
    }

}
