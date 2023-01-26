module.exports = {
    get_cases(contest, redact = false) {
        if (contest.input === '' || contest.output === '') {
            return [];
        }

        const { inputs, outputs } = test_cases.get_inputs_and_outputs(contest);
        let cases = [];

        for (let i = 0; i < inputs.length; ++i) {
            let input = inputs[i];

            let this_case = {
                hide_input: false,
                hide_output: false,
                hide_ignore_active: false,
                args: input,
                stdin: input.join('\n'),
                output: outputs[i].replace(/\\n/g, '\n')
            };

            if (input[0].length == 0) {
                // starts with a pipe
                //|opt_string|.....
                this_case.args = input.splice(2);
                this_case.stdin = this_case.args.join('\n');

                let opt_string = input[1];

                // e.g. |hide_input,hide_output|hello|world
                opt_string.split(',').for_each((opt) => {
                    let vals = opt.split('=');
                    this_case[vals[0]] = vals.length == 1 || vals[1]; // true if there is no =, else the value after the =
                });
            }

            // Hide data from the front-end, but not from the backend
            if (redact && (contest.active || this_case.hide_ignore_active)) {
                if (this_case.hide_input) {
                    this_case.args = this_case.args.map((_) => 'hidden');
                    this_case.stdin = '[hidden]';
                }
                if (this_case.hide_output) {
                    this_case.output = '[hidden]';
                }
            }

            cases.push(this_case);
        }

        return cases;
    },

    async validate_submission(test_cases, solution, language, version) {
        for (const test_case of test_cases) {
            let test_result = await piston.execute(
                language,
                solution,
                test_case.args,
                test_case.stdin,
                version
            );
            if (test_result.run.stdout.trim() !== test_case.output.trim()) {
                return false;
            }
        }

        return true;
    }
};
