up:
create table challenges (
    challenge_id int unsigned not null auto_increment,
    difficulty tinyint unsigned not null,
    points int unsigned not null,
    folder varchar(64) not null,
    name varchar(128) not null,
    description varchar(512) not null,
    primary key (challenge_id),
    key difficulty (difficulty),
    key points (points)
)engine=innodb default charset=utf8;

insert into challenges values (1, 1, 10, '1_reverse_string', 'Reverse a string', 'Just take any given string and output it in reverse, pretty easy, right?');

create table user_challenges (
    user_challenge_id int unsigned not null auto_increment,
    user_id int unsigned not null,
    challenge_id int unsigned not null,
    language varchar(8) not null,
    solution mediumtext not null,
    created_at datetime not null,
    primary key (user_challenge_id),
    key user_id (user_id),
    key challenge_id (challenge_id),
    key language (language),
    key created_at (created_at)
)engine=innodb default charset=utf8;

down:
drop table challenges;
drop table user_challenges;
