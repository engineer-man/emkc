const axios = require('axios');
const timeout = (ms) => new Promise((res) => set_timeout(res, ms));

const emkc_internal_log_message = {
    server: 'EMKC',
    user: 'EMKC Usage'
};

class PistonError extends Error {
    constructor(message, status_code) {
        super(status_code + ': ' + message);
        this.message = message;
        this.error_message = message;
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

    async runtimes() {
        let result = await axios.get(constant.piston_url + '/runtimes');

        return result.data;
    },

    async packages() {
        let result = await axios.get(constant.piston_url + '/packages');

        return result.data;
    },

    async install(language, version) {
        let result = await axios.post(
            constant.piston_url + `/packages/${language}/${version}`
        );

        return result.data;
    },

    async uninstall(language, version) {
        let result = await axios.delete(
            constant.piston_url + `/packages/${language}/${version}`
        );

        return result.data;
    },

    async execute(
        language,
        files,
        args,
        stdin,
        version,
        log_message = emkc_internal_log_message,
        timeouts = {},
        memory_limits = {}
    ) {
        if (!Array.is_array(args)) {
            args = [];
        }

        if (typeof files === 'string') {
            // Assume this is just source, not files
            files = [
                {
                    content: files
                }
            ];
        }

        await timeout(constant.is_prod ? 0 : 500); // Delay by 0.5 seconds when using the public api

        const compile_timeout = constant.piston.timeouts.compile;
        const run_timeout = constant.piston.timeouts.run;
        const compile_memory_limit = constant.piston.memory_limits.compile;
        const run_memory_limit = constant.piston.memory_limits.run;

        const request_timeouts = {
            run_timeout,
            compile_timeout
        };
        const request_memory_limits = {
            run_memory_limit,
            compile_memory_limit
        };

        if (timeouts.compile) {
            request_timeouts.compile_timeout = Math.min(
                compile_timeout,
                timeouts.compile
            );
        }

        if (timeouts.run) {
            request_timeouts.run_timeout = Math.min(run_timeout, timeouts.run);
        }

        if (memory_limits.compile) {
            request_memory_limits.compile_memory_limit =
                compile_memory_limit === -1
                    ? memory_limits.compile
                    : Math.min(compile_memory_limit, memory_limits.compile);
        }

        if (memory_limits.run) {
            request_memory_limits.run_memory_limit =
                run_memory_limit === -1
                    ? memory_limits.run
                    : Math.min(run_memory_limit, memory_limits.run);
        }

        let result = await axios({
            method: 'post',
            url: constant.piston_url + '/execute',
            data: {
                language,
                version,
                files,
                args,
                stdin,
                ...request_timeouts,
                ...request_memory_limits
            }
        });

        if (result.status !== 200) {
            throw new PistonError(result.data.message, result.status);
        }

        if (log_message) {
            db.piston_runs.create({
                ...log_message,
                language,
                source: files[0].content
            });
        }

        let output = '';
        let stdout = '';
        let stderr = '';
        let ran = true;

        if (result.data.compile) {
            output += result.data.compile.output;
            stdout += result.data.compile.stdout;
            stderr += result.data.compile.stderr;
            ran = ran && result.data.compile.code == 0;
        }

        if (result.data.run) {
            output += result.data.run.output;
            stdout += result.data.run.stdout;
            stderr += result.data.run.stderr;
            ran = ran && result.data.run.code == 0;
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
