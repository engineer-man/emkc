const axios = require('axios');
const timeout = ms => new Promise(res => set_timeout(res, ms));

const emkc_internal_log_message = {
    server: 'EMKC',
    user: 'EMKC Usage'
};

class PistonError extends Error {
    constructor(message, status_code){
        super(message);
        this.status_code = status_code;
    }
}

module.exports = {

    languages: {
        python: 'python',
        javascript: 'javascript',
        ruby: 'ruby',
        go: 'go',
        c: 'c',
        cpp: 'cpp',
        csharp: 'csharp',
        php: 'php',
        swift: 'swift',
        java: 'java'
    },

    async runtimes(){
        let result = await axios
        ({
            method: 'get',
            url: constant.get_piston_url() + '/api/v1/runtimes'
        });

        return result.data;
    },

    async packages(){
        let result = await axios.get(constant.get_piston_url() + '/api/v1/packages');
        return result.data;
    },

    async install(language, version){
        let result = await axios.post(constant.get_piston_url() + `/api/v1/packages/${language}/${version}`)
        return result.data
    },

    async uninstall(language, version){
        let result = await axios.delete(constant.get_piston_url() + `/api/v1/packages/${language}/${version}`)
        return result.data
    },

    async execute(language, files, args, stdin, version, log_message = emkc_internal_log_message){
        if (!Array.is_array(args)) {
            args = [];
        }

        if(typeof files === 'string'){
            //Assume this is just source, not files
            files=[{content: files}];
        }

        await timeout(constant.is_prod() ? 0 : 500);  // Delay by 0.5 seconds when using the public api

        let result = await axios
            ({
                method: 'post',
                url: constant.get_piston_url() + '/api/v1/execute',
                data: {
                    language,
                    version,
                    files,
                    args,
                    stdin,
                    compile_timeout: sails.config.piston.timeouts.compile,
                    run_timeout: sails.config.piston.timeouts.run,
                }
            });

        if(result.status !== 200)
            throw new PistonError(result.data.message, result.status)
        
        db.piston_runs.create({...log_message, language, source});

        let output = "";
        let stdout = "";
        let stderr = "";
        let ran = true;

        if(result.data.compile){
            output += result.data.compile.output;
            stdout += result.data.compile.stdout;
            stderr += result.data.compile.stderr;
            ran = ran && (result.data.compile.code == 0);
        }

        if(result.data.run){
            output += result.data.run.output;
            stdout += result.data.run.stdout;
            stderr += result.data.run.stderr;
            ran = ran && (result.data.run.code == 0);
        }

        return {
            ...result.data,
            output,
            stdout,
            stderr,
            ran
        };

            

    }

};
