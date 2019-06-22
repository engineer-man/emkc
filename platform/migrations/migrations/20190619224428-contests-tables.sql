up:
create table contests (
    contest_id int unsigned not null auto_increment,
    name varchar(128) not null,
    start_date datetime not null,
    end_date datetime not null,
    primary key (contest_id),
    key start_date (start_date),
    key end_date (end_date)
)engine=innodb default charset=utf8;

insert into contests values (1, 'Test Contest', '2019-06-19 00:00:00', '2019-08-01 23:59:59');

create table user_contests (
    user_contest_id int unsigned not null auto_increment,
    user_id int unsigned not null,
    contest_id int unsigned not null,
    language varchar(8) not null,
    solution mediumtext not null,
    length int unsigned not null,
    points int unsigned not null,
    created_at datetime not null,
    primary key (user_contest_id),
    key user_id (user_id),
    key contest_id (contest_id),
    key language (language),
    key points (points),
    key created_at (created_at)
)engine=innodb default charset=utf8;

down:
drop table contests;
drop table user_contests;
