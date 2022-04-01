const timeout = (ms) => new Promise((res) => set_timeout(res, ms));

module.exports = {
    get_cases(contest, redact=false){
        let inputs = contest.input.split('\n').map(input => input.split("|"));
        let outputs = contest.output.split('\n');
    
        let cases = [];
    
        for (let i = 0; i < inputs.length; ++i) {
            let input = inputs[i]
            
            let this_case = {
                hide_input: false,
                hide_output: false,
                hide_ignore_active: false,
                args: input,
                stdin: input.join("\n"),
                output: outputs[i].replace(/\\n/g, '\n')
            }
    
            if(input[0].length == 0){ // starts with a pipe
                //|opt_string|.....
                this_case.args = input.splice(2)
                this_case.stdin = this_case.args.join("\n")
                
                let opt_string = input[1]
                
                // e.g. |hide_input,hide_output|hello|world
                opt_string.split(",").for_each(opt => {
                    let vals = opt.split("=")
                    this_case[vals[0]] = vals.length == 1 || vals[1] // true if there is no =, else the value after the =
                })
                
            }
    
            // Hide data from the front-end, but not from the backend
            if(redact && (contest.active || this_case.hide_ignore_active )){
                if(this_case.hide_input){
                    this_case.args = this_case.args.map(_=>"hidden");
                    this_case.stdin = "[hidden]"
                }
                if(this_case.hide_output){
                    this_case.output = "[hidden]";
                }
            }
    
            cases.push(this_case);
        }
    
        return cases
    },    
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
