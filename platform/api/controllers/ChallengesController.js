const fs = require('fs');
const util = require('util');

module.exports = {

    home(req, res) {
        return Promise.resolve(null)
            .then(() => {
                return [
                    db.challenges
                        .find_all({
                            where: {
                                difficulty: constant.challenges.difficulty.easy
                            },
                            order: [
                                ['challenge_id']
                            ]
                        }),
                    db.challenges
                        .find_all({
                            where: {
                                difficulty: constant.challenges.difficulty.medium
                            },
                            order: [
                                ['challenge_id']
                            ]
                        }),
                    db.challenges
                        .find_all({
                            where: {
                                difficulty: constant.challenges.difficulty.hard
                            },
                            order: [
                                ['challenge_id']
                            ]
                        })
                ];
            })
            .spread((easy, medium, hard) => {
                return res.view({
                    easy,
                    medium,
                    hard
                });
            });
    },

    choose_language(req, res) {
        const { challenge_id } = req.params;

        return db.challenges
            .find_one({
                where: {
                    challenge_id
                }
            })
            .then(challenge => {
                if (!challenge) return res.redirect('back');

                return res.view({
                    challenge
                });
            });
    },

    challenge(req, res) {
        const { challenge_id, language } = req.params;

        if (!~constant.challenges.supported_languages.index_of(language)) {
            return res.redirect('back');
        }

        return db.challenges
            .find_one({
                where: {
                    challenge_id
                }
            })
            .then(async challenge => {
                if (!challenge) return res.redirect('back');

                // unpack challenge assets
                const read_file = util.promisify(fs.read_file);
                const base_dir = root_dir + '/platform/resources/challenges';
                const folder = '/' + challenge.folder;
                const ext = {
                    js: 'js',
                    python: 'py',
                    go: 'go',
                    c: 'c',
                    ruby: 'rb',
                    cpp: 'cpp',
                    cs: 'cs',
                    php: 'php',
                    swift: 'swift',
                    java: 'java',
                }[language];

                const abstract = await read_file(base_dir + folder + '/abstract.html');
                const template = await read_file(base_dir + folder + '/template.' + ext);

                return res.view({
                    challenge,
                    language,
                    abstract: abstract.to_string(),
                    template: template.to_string(),
                    monaco_language: {
                        js: 'javascript',
                        python: 'python',
                        go: 'go',
                        c: 'c',
                        ruby: 'ruby',
                        cpp: 'cpp',
                        cs: 'csharp',
                        php: 'php',
                        swift: 'swift',
                        java: 'java',
                    }[language]
                });
            });
    },

    execute(req, res) {
        const { challenge_id } = req.params;
        const { language, source } = req.body;

        return db.challenges
            .find_one({
                where: {
                    challenge_id
                }
            })
            .then(async challenge => {
                const tests = await challenges.get_tests(challenge.folder);

                var results = [];

                tests.for_each(test => {
                    var test_idx = Math.floor(Math.random() * test.input.length);

                    results.push({
                        name: test.name,
                        input: test.input[test_idx].join(','),
                        expected: test.output[test_idx],
                        result: piston.execute(language, source, test.input[test_idx])
                    });
                });

                outputs = await Promise.all(results.map(result => result.result));

                outputs.for_each((output, i) => {
                    results[i].result = output;
                });

                results = results.map((result, i) => {
                    return {
                        name: result.name,
                        passed: result.result === result.expected,
                        input: result.input,
                        expected: result.expected,
                        actual: result.result
                    };
                });

                return res.send({
                    status: 'ok',
                    payload: {
                        results
                    }
                });
            });
    },

    _config: {}

};
