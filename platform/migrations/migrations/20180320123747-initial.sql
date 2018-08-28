up:
create table users (
    user_id int unsigned not null auto_increment,
    is_staff tinyint unsigned not null default 0,
    username varchar(64) null,
    email varchar(128) null,
    password varchar(40) null,
    discord_api varchar(32) null,
    avatar_url varchar(128) null,
    score int not null default 0,
    created_at datetime not null,
    primary key (user_id),
    key is_staff (is_staff),
    key username (username),
    key email (email),
    key discord_api (discord_api),
    key score (score)
)engine=innodb default charset=utf8;

create table questions (
    question_id int unsigned not null auto_increment,
    user_id int unsigned not null,
    title varchar(128) not null,
    question mediumtext not null,
    score int not null default 0,
    comments int unsigned not null default 0,
    created_at datetime not null,
    primary key (question_id),
    key user_id (user_id),
    key score (score),
    key comments (comments),
    key created_at (created_at)
)engine=innodb default charset=utf8;

insert into questions values (1, 1, 'first q title', 'first q question', 0, 16, now());

create table comments (
    comment_id int unsigned not null auto_increment,
    question_id int unsigned not null,
    base_id int unsigned null,
    parent_id int unsigned null,
    user_id int unsigned not null,
    comment mediumtext not null,
    depth int not null default 0,
    score int not null default 0,
    created_at datetime not null,
    primary key (comment_id),
    key question_id (question_id),
    key base_id (base_id),
    key parent_id (parent_id),
    key user_id (user_id),
    key depth (depth),
    key score (score),
    key created_at (created_at)
)engine=innodb default charset=utf8;

insert into comments values (1,  1, null, null, 1,    'c1',   0,  1, now());
insert into comments values (2,  1, 1,    1,    1,    'c1b',  1,  5, now());
insert into comments values (3,  1, 1,    2,    1,    'c1c',  2, -5, now());
insert into comments values (4,  1, 1,    2,    1,    'c1cb', 2, 12, now());
insert into comments values (5,  1, 1,    2,    1,    'c1cc', 2,  9, now());
insert into comments values (6,  1, 1,    5,    1,    'c1d',  3,  9, now());
insert into comments values (7,  1, 1,    6,    1,    'c1e',  4,  2, now());
insert into comments values (8,  1, null, null, 1,    'c2',   0, 17, now());
insert into comments values (9,  1, 8,    8,    1,    'c2b',  1, 10, now());
insert into comments values (10, 1, 8,    9,    1,    'c2c',  2, 19, now());
insert into comments values (11, 1, 8,    10,   1,    'c2d',  3,  2, now());
insert into comments values (12, 1, 8,    11,   1,    'c2e',  4, -4, now());
insert into comments values (13, 1, 8,    12,   1,    'c2f',  5, -4, now());
insert into comments values (14, 1, 8,    13,   1,    'c2g',  6, -4, now());
insert into comments values (15, 1, 8,    14,   1,    'c2h',  7, -4, now());
insert into comments values (16, 1, 8,    15,   1,    'c2i',  8, -4, now());

create table question_votes (
    question_vote_id int unsigned not null auto_increment,
    question_id int unsigned not null,
    user_id int unsigned not null,
    value tinyint not null,
    primary key (question_vote_id),
    key question_id (question_id),
    key user_id (user_id),
    key value (value)
)engine=innodb default charset=utf8;

create table comment_votes (
    comment_vote_id int unsigned not null auto_increment,
    comment_id int unsigned not null,
    user_id int unsigned not null,
    value tinyint not null,
    primary key (comment_vote_id),
    key comment_id (comment_id),
    key user_id (user_id),
    key value (value)
)engine=innodb default charset=utf8;

create table tags (
    tag_id int unsigned not null auto_increment,
    name varchar(128) not null,
    primary key (tag_id),
    key name (name)
)engine=innodb default charset=utf8;

insert into tags values (default, 'abend');
insert into tags values (default, 'absolute-address');
insert into tags values (default, 'absolute-coding');
insert into tags values (default, 'access-violation');
insert into tags values (default, 'acm');
insert into tags values (default, 'action-statement');
insert into tags values (default, 'actionscript');
insert into tags values (default, 'activex');
insert into tags values (default, 'ada');
insert into tags values (default, 'add');
insert into tags values (default, 'ado');
insert into tags values (default, 'advanced-scsi-programming-interface');
insert into tags values (default, 'aggregation');
insert into tags values (default, 'agile-development-methods');
insert into tags values (default, 'agile-manifesto');
insert into tags values (default, 'alert');
insert into tags values (default, 'algol');
insert into tags values (default, 'algorithm');
insert into tags values (default, 'altair-basic');
insert into tags values (default, 'ambient-occlusion');
insert into tags values (default, 'aop');
insert into tags values (default, 'api');
insert into tags values (default, 'applet');
insert into tags values (default, 'argument');
insert into tags values (default, 'arithmetic-operator');
insert into tags values (default, 'array');
insert into tags values (default, 'array-of-pointers');
insert into tags values (default, 'ascii');
insert into tags values (default, 'asp');
insert into tags values (default, 'aspi');
insert into tags values (default, 'assembler');
insert into tags values (default, 'assembly');
insert into tags values (default, 'associative-operation');
insert into tags values (default, 'autohotkey');
insert into tags values (default, 'automata-based-programming');
insert into tags values (default, 'automated-unit-testing');
insert into tags values (default, 'automation');
insert into tags values (default, 'booleanbabel');
insert into tags values (default, 'backend');
insert into tags values (default, 'back-face-culling');
insert into tags values (default, 'background-thread');
insert into tags values (default, 'backpropagation-neural-network');
insert into tags values (default, 'base-address');
insert into tags values (default, 'batch-file');
insert into tags values (default, 'batch-job');
insert into tags values (default, 'bcpl');
insert into tags values (default, 'bean');
insert into tags values (default, 'beanshell');
insert into tags values (default, 'binary-search');
insert into tags values (default, 'bind');
insert into tags values (default, 'bit-shift');
insert into tags values (default, 'bitwise-operators');
insert into tags values (default, 'block');
insert into tags values (default, 'block-level-element');
insert into tags values (default, 'bom');
insert into tags values (default, 'bool');
insert into tags values (default, 'boolean');
insert into tags values (default, 'boolean-data-type');
insert into tags values (default, 'bracket');
insert into tags values (default, 'branch');
insert into tags values (default, 'brooks');
insert into tags values (default, 'bug');
insert into tags values (default, 'bug-tracking');
insert into tags values (default, 'bugfairy');
insert into tags values (default, 'build-computer');
insert into tags values (default, 'bytecode');
insert into tags values (default, 'compiled-programming-languagec');
insert into tags values (default, 'c-sharp');
insert into tags values (default, 'c++');
insert into tags values (default, 'c#');
insert into tags values (default, 'camel-book');
insert into tags values (default, 'camelcase');
insert into tags values (default, 'captured-variable');
insert into tags values (default, 'cc');
insert into tags values (default, 'chaos-model');
insert into tags values (default, 'char');
insert into tags values (default, 'character-code');
insert into tags values (default, 'character-encoding');
insert into tags values (default, 'character-set');
insert into tags values (default, 'chaos-model');
insert into tags values (default, 'circuit-satisfiability-problem');
insert into tags values (default, 'class');
insert into tags values (default, 'class');
insert into tags values (default, 'classpath');
insert into tags values (default, 'clojure');
insert into tags values (default, 'clos');
insert into tags values (default, 'closure');
insert into tags values (default, 'clr');
insert into tags values (default, 'cobol');
insert into tags values (default, 'cocoa');
insert into tags values (default, 'cocoa-touch');
insert into tags values (default, 'code');
insert into tags values (default, 'code-refactoring');
insert into tags values (default, 'codepage');
insert into tags values (default, 'coffeescript');
insert into tags values (default, 'command-language');
insert into tags values (default, 'comment');
insert into tags values (default, 'common-business-oriented-language');
insert into tags values (default, 'common-gateway-interface');
insert into tags values (default, 'compilation');
insert into tags values (default, 'compile');
insert into tags values (default, 'compiler');
insert into tags values (default, 'complementarity');
insert into tags values (default, 'compute');
insert into tags values (default, 'computer-science');
insert into tags values (default, 'commutative-operation');
insert into tags values (default, 'concat');
insert into tags values (default, 'concatenation');
insert into tags values (default, 'concurrency');
insert into tags values (default, 'conditional-expression');
insert into tags values (default, 'conditional-statement');
insert into tags values (default, 'constant');
insert into tags values (default, 'constructor');
insert into tags values (default, 'constructor-chaining');
insert into tags values (default, 'content-migration');
insert into tags values (default, 'control-flow');
insert into tags values (default, 'cpan');
insert into tags values (default, 'cpl');
insert into tags values (default, 'crapplet');
insert into tags values (default, 'cs');
insert into tags values (default, 'csat');
insert into tags values (default, 'css');
insert into tags values (default, 'css-compressor');
insert into tags values (default, 'css-editor');
insert into tags values (default, 'curly-bracket');
insert into tags values (default, 'curry');
insert into tags values (default, 'cvs');
insert into tags values (default, 'cygwin');
insert into tags values (default, 'sparse-matrixd');
insert into tags values (default, 'darkbasic');
insert into tags values (default, 'dart');
insert into tags values (default, 'dataflow-programming');
insert into tags values (default, 'data-flow-analysis');
insert into tags values (default, 'data-flow-diagram');
insert into tags values (default, 'data-source');
insert into tags values (default, 'data-type');
insert into tags values (default, 'datalog');
insert into tags values (default, 'dde');
insert into tags values (default, 'dead-code');
insert into tags values (default, 'debug');
insert into tags values (default, 'debugger');
insert into tags values (default, 'debugging');
insert into tags values (default, 'declaration');
insert into tags values (default, 'declarative-programming');
insert into tags values (default, 'declare');
insert into tags values (default, 'decompiler');
insert into tags values (default, 'decrement');
insert into tags values (default, 'deductive-database');
insert into tags values (default, 'delimiter');
insert into tags values (default, 'dense-matrix');
insert into tags values (default, 'dereference-operator');
insert into tags values (default, 'dependent-variable');
insert into tags values (default, 'developer');
insert into tags values (default, 'dhtml');
insert into tags values (default, 'die');
insert into tags values (default, 'diff');
insert into tags values (default, 'direct-address');
insert into tags values (default, 'discrete-optimization');
insert into tags values (default, 'dissembler');
insert into tags values (default, 'div');
insert into tags values (default, 'django');
insert into tags values (default, 'dml');
insert into tags values (default, 'do');
insert into tags values (default, 'dom');
insert into tags values (default, 'dragon-book');
insert into tags values (default, 'dribbleware');
insert into tags values (default, 'dump');
insert into tags values (default, 'dword');
insert into tags values (default, 'dylan-programming-language');
insert into tags values (default, 'dynamic-dump');
insert into tags values (default, 'exececlipse');
insert into tags values (default, 'ecmascript');
insert into tags values (default, 'eight-queens-problem');
insert into tags values (default, 'element');
insert into tags values (default, 'ellipsis');
insert into tags values (default, 'else');
insert into tags values (default, 'else-if');
insert into tags values (default, 'elsif');
insert into tags values (default, 'embedded-java');
insert into tags values (default, 'encapsulation');
insert into tags values (default, 'encode');
insert into tags values (default, 'endian');
insert into tags values (default, 'endless-loop');
insert into tags values (default, 'eof');
insert into tags values (default, 'epoch');
insert into tags values (default, 'eq');
insert into tags values (default, 'equal');
insert into tags values (default, 'error');
insert into tags values (default, 'errorlevel');
insert into tags values (default, 'esac');
insert into tags values (default, 'escape');
insert into tags values (default, 'escape-character');
insert into tags values (default, 'escape-sequence');
insert into tags values (default, 'eval');
insert into tags values (default, 'event');
insert into tags values (default, 'event-handler');
insert into tags values (default, 'event-listener');
insert into tags values (default, 'event-driven-programming');
insert into tags values (default, 'exec');
insert into tags values (default, 'exception');
insert into tags values (default, 'exception-handling');
insert into tags values (default, 'exists');
insert into tags values (default, 'exponent');
insert into tags values (default, 'exponential-backoff');
insert into tags values (default, 'expression');
insert into tags values (default, 'foreachf-programming-language');
insert into tags values (default, 'f#');
insert into tags values (default, 'false');
insert into tags values (default, 'fifth-generation-language');
insert into tags values (default, 'first-generation-language');
insert into tags values (default, 'first-class-object');
insert into tags values (default, 'flag');
insert into tags values (default, 'flat-file');
insert into tags values (default, 'floating-point');
insert into tags values (default, 'for');
insert into tags values (default, 'foreach');
insert into tags values (default, 'forth');
insert into tags values (default, 'forth-generation-language');
insert into tags values (default, 'fortran');
insert into tags values (default, 'framework');
insert into tags values (default, 'front-end');
insert into tags values (default, 'full-stack-developer');
insert into tags values (default, 'function');
insert into tags values (default, 'functional-programming');
insert into tags values (default, 'fuzz-testing');
insert into tags values (default, 'game-of-lifegame-of-life');
insert into tags values (default, 'gang-of-four');
insert into tags values (default, 'garbage-collection');
insert into tags values (default, 'gaussian-pyramid');
insert into tags values (default, 'gcc');
insert into tags values (default, 'ge');
insert into tags values (default, 'general-purpose-language');
insert into tags values (default, 'generation-language');
insert into tags values (default, 'genetic-programming');
insert into tags values (default, 'gigo');
insert into tags values (default, 'github');
insert into tags values (default, 'glitch');
insert into tags values (default, 'glob');
insert into tags values (default, 'glue-code');
insert into tags values (default, 'go-language');
insert into tags values (default, 'goto');
insert into tags values (default, 'gpl');
insert into tags values (default, 'grasshopper');
insert into tags values (default, 'gt');
insert into tags values (default, 'gtk');
insert into tags values (default, 'gw-basic');
insert into tags values (default, 'haskell-programming-languagehal');
insert into tags values (default, 'hard-code');
insert into tags values (default, 'hash');
insert into tags values (default, 'haskell');
insert into tags values (default, 'heap');
insert into tags values (default, 'hello-world');
insert into tags values (default, 'heuristic-evaluation');
insert into tags values (default, 'hex-editor');
insert into tags values (default, 'hdml');
insert into tags values (default, 'hiew');
insert into tags values (default, 'high-level-language');
insert into tags values (default, 'html');
insert into tags values (default, 'hungarian-notation');
insert into tags values (default, 'hwclock');
insert into tags values (default, 'hypertext-markup-language');
insert into tags values (default, 'iterationide');
insert into tags values (default, 'if-else');
insert into tags values (default, 'if-statement');
insert into tags values (default, 'immutable-object');
insert into tags values (default, 'imperative-programming');
insert into tags values (default, 'implicit-parallelism');
insert into tags values (default, 'increment');
insert into tags values (default, 'indirection-operator');
insert into tags values (default, 'inherent-error');
insert into tags values (default, 'inheritance');
insert into tags values (default, 'inline');
insert into tags values (default, 'input/output-statement');
insert into tags values (default, 'instance');
insert into tags values (default, 'instantiation');
insert into tags values (default, 'instructions');
insert into tags values (default, 'int');
insert into tags values (default, 'integer');
insert into tags values (default, 'integrated-development-environment');
insert into tags values (default, 'intellij-idea');
insert into tags values (default, 'intermediate-language');
insert into tags values (default, 'interpreted');
insert into tags values (default, 'interpreter');
insert into tags values (default, 'invalid');
insert into tags values (default, 'ioccc');
insert into tags values (default, 'ipc');
insert into tags values (default, 'isapi');
insert into tags values (default, 'iteration');
insert into tags values (default, 'javascript-or-js-logojava');
insert into tags values (default, 'java-champion');
insert into tags values (default, 'java-ee');
insert into tags values (default, 'java-me');
insert into tags values (default, 'java-native-language');
insert into tags values (default, 'java-reserved-words');
insert into tags values (default, 'javabean');
insert into tags values (default, 'javac');
insert into tags values (default, 'javafx');
insert into tags values (default, 'javascript');
insert into tags values (default, 'javascriptcore');
insert into tags values (default, 'javax');
insert into tags values (default, 'jbuilder');
insert into tags values (default, 'jcl');
insert into tags values (default, 'jdbc');
insert into tags values (default, 'jdk');
insert into tags values (default, 'jil');
insert into tags values (default, 'jit');
insert into tags values (default, 'jhtml');
insert into tags values (default, 'jni');
insert into tags values (default, 'jre');
insert into tags values (default, 'jscript');
insert into tags values (default, 'json');
insert into tags values (default, 'jsp');
insert into tags values (default, 'jsr');
insert into tags values (default, 'julia');
insert into tags values (default, 'jvm');
insert into tags values (default, 'karel');
insert into tags values (default, 'kit');
insert into tags values (default, 'kludge');
insert into tags values (default, 'kluge');
insert into tags values (default, 'looplabel');
insert into tags values (default, 'lambda-calculus');
insert into tags values (default, 'language');
insert into tags values (default, 'language-processor');
insert into tags values (default, 'lexical-analysis');
insert into tags values (default, 'lexicon');
insert into tags values (default, 'linker');
insert into tags values (default, 'lisp');
insert into tags values (default, 'live-script');
insert into tags values (default, 'literal');
insert into tags values (default, 'llvm');
insert into tags values (default, 'local-optimum');
insert into tags values (default, 'logic-programming');
insert into tags values (default, 'logical-operation');
insert into tags values (default, 'logo');
insert into tags values (default, 'lookup-table');
insert into tags values (default, 'loony-bin');
insert into tags values (default, 'loop');
insert into tags values (default, 'loophole');
insert into tags values (default, 'loosely-typed-language');
insert into tags values (default, 'low-level-language');
insert into tags values (default, 'library');
insert into tags values (default, 'lt');
insert into tags values (default, 'lua');
insert into tags values (default, 'lut');
insert into tags values (default, 'matlab-logomachine-language');
insert into tags values (default, 'magic-quotes');
insert into tags values (default, 'map');
insert into tags values (default, 'markup-language');
insert into tags values (default, 'math');
insert into tags values (default, 'matlab');
insert into tags values (default, 'mbean');
insert into tags values (default, 'memoization');
insert into tags values (default, 'mercurial');
insert into tags values (default, 'meta-character');
insert into tags values (default, 'metaclass');
insert into tags values (default, 'metalanguage');
insert into tags values (default, 'method');
insert into tags values (default, 'method-overloading');
insert into tags values (default, 'metro');
insert into tags values (default, 'middleware');
insert into tags values (default, 'mod');
insert into tags values (default, 'module');
insert into tags values (default, 'modulo');
insert into tags values (default, 'monkey-testing');
insert into tags values (default, 'monte-carlo-method');
insert into tags values (default, 'msdn');
insert into tags values (default, 'msvc');
insert into tags values (default, 'multi-pass-compiler');
insert into tags values (default, 'mumps');
insert into tags values (default, 'mutex');
insert into tags values (default, 'microsoft-dotnet');
insert into tags values (default, 'ne');
insert into tags values (default, 'dotnet');
insert into tags values (default, 'native-compiler');
insert into tags values (default, 'native-language');
insert into tags values (default, 'natural-language');
insert into tags values (default, 'nbsp');
insert into tags values (default, 'nda');
insert into tags values (default, 'nested-function');
insert into tags values (default, 'nested-loop-join');
insert into tags values (default, 'newline');
insert into tags values (default, 'nil-pointer');
insert into tags values (default, 'nim');
insert into tags values (default, 'node-js');
insert into tags values (default, 'nodelist');
insert into tags values (default, 'noncontiguous-data-structure');
insert into tags values (default, 'non-disclosure-agreement');
insert into tags values (default, 'nonexecutable-statement');
insert into tags values (default, 'no-operation-instructions');
insert into tags values (default, 'null');
insert into tags values (default, 'null-character');
insert into tags values (default, 'null-pointer');
insert into tags values (default, 'operatorobject-code');
insert into tags values (default, 'object-file');
insert into tags values (default, 'object-module');
insert into tags values (default, 'object-oriented-programming');
insert into tags values (default, 'objective-c');
insert into tags values (default, 'obfuscated-code');
insert into tags values (default, 'ocaml');
insert into tags values (default, 'octave');
insert into tags values (default, 'odbc');
insert into tags values (default, 'oop');
insert into tags values (default, 'one-pass-compiler');
insert into tags values (default, 'opcode');
insert into tags values (default, 'open-database-connectivity');
insert into tags values (default, 'opengl-polygon');
insert into tags values (default, 'operand');
insert into tags values (default, 'operator');
insert into tags values (default, 'operator-associatively');
insert into tags values (default, 'operator-precedence');
insert into tags values (default, 'or-operator');
insert into tags values (default, 'overflow-error');
insert into tags values (default, 'overload');
insert into tags values (default, 'practical-extraction-reporting-languagep-code');
insert into tags values (default, 'package');
insert into tags values (default, 'parenthesis');
insert into tags values (default, 'parse');
insert into tags values (default, 'pascal');
insert into tags values (default, 'pascal-case');
insert into tags values (default, 'pastebin');
insert into tags values (default, 'pdl');
insert into tags values (default, 'pear');
insert into tags values (default, 'perl');
insert into tags values (default, 'persistent-memory');
insert into tags values (default, 'personaljava');
insert into tags values (default, 'php');
insert into tags values (default, 'phrase-tag');
insert into tags values (default, 'pick');
insert into tags values (default, 'pickling');
insert into tags values (default, 'picojava');
insert into tags values (default, 'pipe');
insert into tags values (default, 'pixel-shader');
insert into tags values (default, 'pod');
insert into tags values (default, 'pointer');
insert into tags values (default, 'polymorphism');
insert into tags values (default, 'pop');
insert into tags values (default, 'positional-parameter');
insert into tags values (default, 'private');
insert into tags values (default, 'procedural-language');
insert into tags values (default, 'procedure');
insert into tags values (default, 'process');
insert into tags values (default, 'program');
insert into tags values (default, 'program-generator');
insert into tags values (default, 'program-listing');
insert into tags values (default, 'programmable');
insert into tags values (default, 'programmer');
insert into tags values (default, 'programming');
insert into tags values (default, 'programming-in-logic');
insert into tags values (default, 'programming-language');
insert into tags values (default, 'programming-tools');
insert into tags values (default, 'prolog');
insert into tags values (default, 'pseudocode');
insert into tags values (default, 'pseudolanguage');
insert into tags values (default, 'pseudo-operation');
insert into tags values (default, 'pseudo-random');
insert into tags values (default, 'public');
insert into tags values (default, 'purebasic');
insert into tags values (default, 'push');
insert into tags values (default, 'python');
insert into tags values (default, 'python-pickling');
insert into tags values (default, 'pythonic');
insert into tags values (default, 'qi');
insert into tags values (default, 'qt');
insert into tags values (default, 'quick-and-dirty');
insert into tags values (default, 'return-statementr-programming-language');
insert into tags values (default, 'race-condition');
insert into tags values (default, 'racket');
insert into tags values (default, 'rad');
insert into tags values (default, 'random');
insert into tags values (default, 'random-seed');
insert into tags values (default, 'rcs');
insert into tags values (default, 'rdf');
insert into tags values (default, 'react');
insert into tags values (default, 'react-native');
insert into tags values (default, 'real-number');
insert into tags values (default, 'recursion');
insert into tags values (default, 'recursive');
insert into tags values (default, 'regex');
insert into tags values (default, 'regular-expression');
insert into tags values (default, 'reia');
insert into tags values (default, 'relational-algebra');
insert into tags values (default, 'religion-of-chi');
insert into tags values (default, 'rem');
insert into tags values (default, 'remark');
insert into tags values (default, 'repeat-counter');
insert into tags values (default, 'repl');
insert into tags values (default, 'reserved-character');
insert into tags values (default, 'reserved-word');
insert into tags values (default, 'resource-description-framework');
insert into tags values (default, 'return-address');
insert into tags values (default, 'return-statement');
insert into tags values (default, 'reverse-engineering');
insert into tags values (default, 'revision-control');
insert into tags values (default, 'rom-basic');
insert into tags values (default, 'routine');
insert into tags values (default, 'routing-algorithm');
insert into tags values (default, 'rpg');
insert into tags values (default, 'ruby');
insert into tags values (default, 'run-time');
insert into tags values (default, 'rust');
insert into tags values (default, 'spaghetti-codes-expression');
insert into tags values (default, 'safe-font');
insert into tags values (default, 'sandbox');
insert into tags values (default, 'scala');
insert into tags values (default, 'scanf');
insert into tags values (default, 'schema-matching');
insert into tags values (default, 'scheme-programming-language');
insert into tags values (default, 'scratch');
insert into tags values (default, 'sdk');
insert into tags values (default, 'second-generation-language');
insert into tags values (default, 'section');
insert into tags values (default, 'security-descriptor-definition-language');
insert into tags values (default, 'seed');
insert into tags values (default, 'segfault');
insert into tags values (default, 'separator');
insert into tags values (default, 'sequence');
insert into tags values (default, 'server-side');
insert into tags values (default, 'server-side-scripting');
insert into tags values (default, 'servlet');
insert into tags values (default, 'sgml');
insert into tags values (default, 'shebang');
insert into tags values (default, 'shell-scripts');
insert into tags values (default, 'shift');
insert into tags values (default, 'short-circuit-operator');
insert into tags values (default, 'signedness');
insert into tags values (default, 'simulated-annealing');
insert into tags values (default, 'single-step');
insert into tags values (default, 'smalltalk');
insert into tags values (default, 'smil');
insert into tags values (default, 'snippet');
insert into tags values (default, 'soap');
insert into tags values (default, 'socket');
insert into tags values (default, 'soft');
insert into tags values (default, 'software-development-phases');
insert into tags values (default, 'software-development-process');
insert into tags values (default, 'software-engineering');
insert into tags values (default, 'software-library');
insert into tags values (default, 'software-life-cycle');
insert into tags values (default, 'source');
insert into tags values (default, 'source-code');
insert into tags values (default, 'source-computer');
insert into tags values (default, 'source-data');
insert into tags values (default, 'sourceforge');
insert into tags values (default, 'spaghetti-code');
insert into tags values (default, 'sparse-matrix');
insert into tags values (default, 'sparsity');
insert into tags values (default, 'special-purpose-language');
insert into tags values (default, 'spl');
insert into tags values (default, 'spooling');
insert into tags values (default, 'sql');
insert into tags values (default, 'stack');
insert into tags values (default, 'stack-pointer');
insert into tags values (default, 'standard-attribute');
insert into tags values (default, 'statement');
insert into tags values (default, 'stdin');
insert into tags values (default, 'strong-typed-language');
insert into tags values (default, 'stubroutine');
insert into tags values (default, 'stylesheet');
insert into tags values (default, 'subprogram');
insert into tags values (default, 'subroutine');
insert into tags values (default, 'subscript');
insert into tags values (default, 'substring');
insert into tags values (default, 'subversion');
insert into tags values (default, 'superclass');
insert into tags values (default, 'switch-statement');
insert into tags values (default, 'syntactic-sugar');
insert into tags values (default, 'syntax-error');
insert into tags values (default, 'system-development');
insert into tags values (default, 'systems-engineer');
insert into tags values (default, 'systems-programming-language');
insert into tags values (default, 'tupletail-recursion');
insert into tags values (default, 'tcl');
insert into tags values (default, 'tcl/tk');
insert into tags values (default, 'ternary-operator');
insert into tags values (default, 'theoretical-computer-science-');
insert into tags values (default, 'third-generation-language');
insert into tags values (default, 'thread');
insert into tags values (default, 'thunk');
insert into tags values (default, 'tk');
insert into tags values (default, 'token');
insert into tags values (default, 'transcompiler');
insert into tags values (default, 'true');
insert into tags values (default, 'true-basic');
insert into tags values (default, 'trunk');
insert into tags values (default, 'tuple');
insert into tags values (default, 'turbo-pascal');
insert into tags values (default, 'turing-completeness');
insert into tags values (default, 'unary-operator');
insert into tags values (default, 'undefined');
insert into tags values (default, 'undefined-variable');
insert into tags values (default, 'underflow');
insert into tags values (default, 'unescape');
insert into tags values (default, 'unit-test');
insert into tags values (default, 'unshift');
insert into tags values (default, 'value');
insert into tags values (default, 'var');
insert into tags values (default, 'variable');
insert into tags values (default, 'vb');
insert into tags values (default, 'vector');
insert into tags values (default, 'vhdl');
insert into tags values (default, 'vim');
insert into tags values (default, 'visual-basic');
insert into tags values (default, 'visual-studio');
insert into tags values (default, 'void');
insert into tags values (default, 'waterfall-model');
insert into tags values (default, 'web-development');
insert into tags values (default, 'webgl');
insert into tags values (default, 'while');
insert into tags values (default, 'whole-number');
insert into tags values (default, 'wml');
insert into tags values (default, 'workspace');
insert into tags values (default, 'xml');
insert into tags values (default, 'xna');
insert into tags values (default, 'xor-operator');
insert into tags values (default, 'xoxo');
insert into tags values (default, 'xsl');
insert into tags values (default, 'xslt');
insert into tags values (default, 'y-combinator');
insert into tags values (default, 'yaml');
insert into tags values (default, 'z-buffering');
insert into tags values (default, 'zombie');

down:
drop table users;
drop table questions;
drop table comments;
drop table tags;
drop table question_votes;
drop table comment_votes;
