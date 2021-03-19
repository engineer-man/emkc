const fs = require('fs');
const util = require('util');

module.exports = {

    async home(req, res) {
        let options = {
            where: {
                draft: 0,
            },
            include: [
                {
                    required: false,
                    model: db.user_challenges,
                    as: 'solution',
                    where: {
                        user_id: req.local.user_id
                    }
                }
            ],
            order: [
                ['challenge_id']
            ],
            group: 'challenge_id'
        };

        options.where.difficulty = constant.challenges.difficulty.easy;

        let easy = await db.challenges
            .find_all(options);

        options.where.difficulty = constant.challenges.difficulty.medium;

        let medium = await db.challenges
            .find_all(options);

        options.where.difficulty = constant.challenges.difficulty.hard;

        let hard = await db.challenges
            .find_all(options);

        return res.view({
            easy,
            medium,
            hard
        });
    },

    async choose_language(req, res) {
        const { challenge_id } = req.params;

        let challenge = await db.challenges
            .find_one({
                where: {
                    challenge_id
                },
                include: [
                    {
                        required: false,
                        user_id: req.local.user_id,
                        model: db.user_challenges,
                        as: 'solutions',
                        where: {
                            user_id: req.local.user_id
                        }
                    }
                ]
            });

        if (!challenge) {
            return res.redirect('back');
        }

        return res.view({
            challenge,
            solved: challenge.solutions.map(s => s.language)
        });
    },

    async challenge(req, res) {
        const { challenge_id, language } = req.params;

        if (!~constant.challenges.supported_languages.index_of(language)) {
            return res.redirect('back');
        }

        let challenge = await db.challenges
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
                            user_id: req.local.user_id,
                            language
                        }
                    },
                    {
                        required: false,
                        model: db.challenge_tests,
                        as: 'tests'
                    }
                ]
            });

        if (!challenge) {
            return res.redirect('back');
        }

        // unpack challenge assets
        const read_file = util.promisify(fs.read_file);
        const base_dir = root_dir + '/platform/resources/challenges';
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
            rust: 'rs',
            julia: 'jl',
            bash: 'sh',
            perl: 'pl',
            kotlin: 'kt',
            haskell: 'hs',
            nim: 'nim',
        }[language];

        const abstract = challenge.html;
        let base_template = await read_file(base_dir + '/templates/template.' + ext);

        let template = '';

        base_template = base_template
            .to_string()
            .split('\n');

        for (const line of base_template) {
            // non processed line, add directly
            if (!line.match(/^\s*%%/gi)) {
                template += line + '\n';
                continue;
            }

            // parse the input according to rules and return the first to determine template types
            let input = challenge.tests[0].input
                .split('\n')
                .map(input_line => {
                    return input_line
                        .split('|')
                        .map(value => {
                            if (value.match(/^[0-9]+$/)) {
                                return parse_int(value);
                            }

                            if (value.match(/^[0-9]+\.[0-9]+$/)) {
                                return parse_float(value);
                            }

                            return value;
                        })
                })[0];

            if (line.match(/^\s*%%_IMPORTS_%%/gi)) {
                let has_string = input.some(input => typeof input === 'string');
                let has_int = input.some(input => typeof input === 'number');

                switch (language) {
                    case 'go':
                        if (has_int)
                            template += '    "strconv"\n';
                        break;
                    case 'nim':
                        if (has_int)
                            template += 'import os, parseutils';
                        else
                            template += 'import os';

                        template += '\n\n';

                        break;
                }

                continue;
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
                            template += `    std::string value${i} = argv[${i}];`;
                        if (typeof input === 'number')
                            template += `    int value${i} = std::atoi(argv[${i}]);`;
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
                            template += `    value${i}, _ := strconv.Atoi(os.Args[${i}])`
                        break;
                    case 'java':
                        if (typeof input === 'string')
                            template += `        String value${i} = args[${i-1}];`
                        if (typeof input === 'number')
                            template += `        int value${i} = Integer.parseInt(args[${i-1}]);`
                        break;
                    case 'kotlin':
                        if (typeof input === 'string')
                            template += `    val value${i} = args[${i-1}]`
                        if (typeof input === 'number')
                            template += `    val value${i} = args[${i-1}].toInt()`
                        break;
                    case 'haskell':
                        template += `    let value${i} = (args !! ${i-1})`
                        break;
                    case 'rust':
                        if (typeof input === 'string')
                            template += `    let value${i}: &String = &args[${i}];`
                        if (typeof input === 'number')
                            template += `    let value${i}: i32 = args[${i}].parse().unwrap();`
                        break;
                    case 'js':
                        if (typeof input === 'string')
                            template += `const value${i} = process.argv[${i+1}];`;
                        if (typeof input === 'number')
                            template += `const value${i} = parseInt(process.argv[${i+1}]);`;
                        break;
                    case 'php':
                        template += `$value${i} = $argv[${i}];`;
                        break;
                    case 'python':
                        if (typeof input === 'string')
                            template += `value${i} = sys.argv[${i}]`;
                        if (typeof input === 'number')
                            template += `value${i} = int(sys.argv[${i}])`;
                        break;
                    case 'ruby':
                        template += `value${i} = ARGV[${i-1}]`;
                        break;
                    case 'swift':
                        template += `var value${i} = CommandLine.arguments[${i}]`;
                        break;
                    case 'julia':
                        if (typeof input === 'string')
                            template += `value${i} = ARGS[${i}]`;
                        if (typeof input === 'number')
                            template += `value${i} = parse(Int, ARGS[${i}])`;
                        break;
                    case 'bash':
                        template += `value${i}=$${i}`;
                        break;
                    case 'perl':
                        template += `my $value${i} = $ARGV[${i-1}];`;
                        break;
                    case 'nim':
                        if (typeof input === 'number') {
                            template += `var value${i}: int\n`
                            template += `discard parseInt(paramStr(${i}), value${i})`;
                        } else {
                            template += `var value${i} = paramStr(${i})`
                        }

                        break;
                }
                template += '\n';
            });
        }

        template = template.trim() + '\n';

        return res.view({
            solved: !!challenge.solution,
            challenge,
            language,
            abstract,
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
                rust: 'rust',
                julia: 'julia',
                bash: 'shell',
                perl: 'perl',
                kotlin: 'kotlin',
                haskell: 'haskell',
                nim: 'nim',
            }[language]
        });
    },

    async execute(req, res) {
        const { challenge_id } = req.params;
        const { language, source } = req.body;

        let challenge = await db.challenges
            .find_one({
                where: {
                    challenge_id
                },
                include: {
                    required: false,
                    model: db.challenge_tests,
                    as: 'tests'
                }
            });

        var results = [];

        for (const test of challenge.tests) {
            let inputs = test.input.split('\n'); // We still have the arguments separated by |
            let test_idx = Math.floor(Math.random() * inputs.length);
            let outputs = test.output.split('\n')

            results.push({
                name: test.name,
                input: inputs[test_idx],
                expected: outputs[test_idx],
                result: await piston.execute(language, source, inputs[test_idx].split('|'))
            });
        }

        let promise_outputs = await Promise.all(results.map(result => result.result));

        promise_outputs.for_each((output, i) => {
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

        if (passed && req.local.user_id && !challenge.draft) {
            set_immediate(async () => {
                let [ user_challenge, created ] = await db.user_challenges
                    .find_or_create({
                        where: {
                            user_id: req.local.user_id,
                            challenge_id: challenge.challenge_id,
                            language
                        },
                        defaults: {
                            solution: source
                        }
                    });

                if (created) {
                    return null;
                }

                user_challenge.solution = source;
                user_challenge.save();
            });

        }

        return res
            .status(200)
            .send(results);
    },

    async view_other(req, res) {
        const { username, challenge_id, language } = req.params;

        let user = await db.users
            .find_one({
                where: {
                    username
                }
            });

        if (!user) throw null;

        let user_solution = await db.user_challenges
            .find_one({
                where: {
                    user_id: req.local.user_id,
                    challenge_id,
                    language
                }
            });

        if (!user_solution) {
            return res.redirect('back');
        }

        let challenge = await db.user_challenges
            .find_one({
                where: {
                    user_id: user.user_id,
                    challenge_id,
                    language
                },
                include: [
                    {
                        model: db.challenges,
                        as: 'challenge'
                    }
                ],
                order: [
                    ['created_at', 'desc']
                ]
            });

        if (challenge) {
            return res.view('snippets/view', {
                snippet: {
                    language,
                    snip: challenge.solution
                }
            });
        }

        return res.redirect('/snippets');
    }

};
