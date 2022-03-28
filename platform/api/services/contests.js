const timeout = (ms) => new Promise((res) => set_timeout(res, ms));

module.exports = {
    async check_submission_validity(test_cases, solution, language, version) {
        let counter = 0;

        while (counter < test_cases.length) {
            await timeout(constant.is_prod() ? 0 : 500);

            let current_test_case = test_cases[counter];
            
            try {
                let test_result = await piston.execute(
                    language,
                    solution,
                    current_test_case.args,
                    current_test_case.stdin,
                    version
                );
                if (
                    test_result.run.stdout.trim() !== current_test_case.output.trim()
                ) {
                    return false;
                }
            } catch (e) {
                return false;
            }

            ++counter;
        }

        return true;
    }
};
