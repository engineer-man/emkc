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
                            include: [
                                {
                                    required: false,
                                    model: db.user_challenges,
                                    as: 'solution',
                                    where: {
                                        user_id: req.glob.user_id
                                    }
                                }
                            ],
                            order: [
                                ['challenge_id']
                            ],
                            group: 'challenge_id'
                        }),
                    db.challenges
                        .find_all({
                            where: {
                                difficulty: constant.challenges.difficulty.medium
                            },
                            include: [
                                {
                                    required: false,
                                    model: db.user_challenges,
                                    as: 'solution',
                                    where: {
                                        user_id: req.glob.user_id
                                    }
                                }
                            ],
                            order: [
                                ['challenge_id']
                            ],
                            group: 'challenge_id'
                        }),
                    db.challenges
                        .find_all({
                            where: {
                                difficulty: constant.challenges.difficulty.hard
                            },
                            include: [
                                {
                                    required: false,
                                    model: db.user_challenges,
                                    as: 'solution',
                                    where: {
                                        user_id: req.glob.user_id
                                    }
                                }
                            ],
                            order: [
                                ['challenge_id']
                            ],
                            group: 'challenge_id'
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
                },
                include: [
                    {
                        required: false,
                        model: db.user_challenges,
                        as: 'solution',
                        where: {
                            user_id: req.glob.user_id,
                            language
                        }
                    }
                ]
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
                const tests = JSON.parse(await read_file(base_dir + folder + '/tests.json'));
                const base_template = await read_file(base_dir + '/templates/template.' + ext);

                var template = '';

                base_template
                    .to_string()
                    .split('\n')
                    .for_each(line => {
                        // non processed line, add directly
                        if (!line.match(/^\s*%%/gi)) {
                            template += line + '\n';
                            return;
                        }

                        var input = tests[0].input[0];

                        if (line.match(/^\s*%%_IMPORTS_%%/gi)) {
                            var has_string = input.some(input => typeof input === 'string');
                            var has_int = input.some(input => typeof input === 'number');

                            switch (language) {
                                case 'go':
                                    if (has_int)
                                        template += '    "strconv"\n';
                                    break;
                            }

                            return;
                        }

                        input.for_each((input, i) => {
                            ++i;
                            switch (language) {
                                case 'c':
                                    if (typeof input === 'string')
                                        template += `    char value${i}[128]; strcpy(value${i}, argv[${i}]);`;
                                    if (typeof input === 'number')
                                        template += `    int value${i} = atoi(argv[${i}]);`;
                                    break;
                                case 'cpp':
                                    if (typeof input === 'string')
                                        template += `    string value${i} = argv[${i}];`;
                                    if (typeof input === 'number')
                                        template += `    int value${i} = atoi(argv[${i}]);`;
                                    break;
                                case 'cs':
                                    if (typeof input === 'string')
                                        template += `        string value${i} = args[${i-1}];`
                                    if (typeof input === 'number')
                                        template += `        int value${i} = Convert.ToInt32(args[${i-1}]);`
                                    break;
                                case 'go':
                                    if (typeof input === 'string')
                                        template += `    var value${i} string = os.Args[${i}]`
                                    if (typeof input === 'number')
                                        template += `    var value${i} int = strconv.Atoi(os.Args[${i}])`
                                    break;
                                case 'java':
                                    if (typeof input === 'string')
                                        template += `        String value${i} = args[${i-1}];`
                                    if (typeof input === 'number')
                                        template += `        Integer value${i} = Integer.parseInt(args[${i-1}]);`
                                    break;
                                case 'js':
                                    template += `const value${i} = process.argv[${i+1}];`
                                    break;
                                case 'php':
                                    template += `$value${i} = $argv[${i}];`;
                                    break;
                                case 'python':
                                    template += `value${i} = sys.argv[${i}]`;
                                    break;
                                case 'ruby':
                                    template += `value${i} = ARGV[${i-1}]`;
                                    break;
                                case 'swift':
                                    template += `var value${i} = CommandLine.arguments[${i}]`;
                                    break;
                            }
                            template += '\n';
                        });
                    });

                template = template.trim() + '\n';

                return res.view({
                    solved: !!challenge.solution,
                    challenge,
                    language,
                    abstract: abstract.to_string(),
                    template,
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

                var passed = results.filter(r => !r.passed).length === 0;

                if (passed && req.glob.user_id) {
                    db.user_challenges
                        .find_or_create({
                            where: {
                                user_id: req.glob.user_id,
                                challenge_id: challenge.challenge_id,
                                language
                            },
                            defaults: {
                                solution: source
                            }
                        });
                }

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
