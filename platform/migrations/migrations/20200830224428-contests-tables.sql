up:
create table contests (
    contest_id int unsigned not null auto_increment,
    name varchar(128) not null,
    description mediumtext not null,
    start_date datetime not null,
    end_date datetime not null,
    input text not null,
    output text not null,
    created_at datetime not null,
    primary key (contest_id),
    key start_date (start_date),
    key end_date (end_date),
    key created_at (created_at)
)engine=innodb default charset=utf8;

insert into contests values (1, 'First Contest', 'Test Description', '2020-08-29 00:00:00', '2020-09-20 23:59:59', '5', '5', now());

create table contest_submissions (
    contest_submission_id int unsigned not null auto_increment,
    user_id int unsigned not null,
    contest_id int unsigned not null,
    language varchar(32) not null,
    solution mediumtext not null,
    length int unsigned not null,
    award_place int unsigned null,
    award_points int unsigned null,
    created_at datetime not null,
    primary key (contest_submission_id),
    key user_id (user_id),
    key contest_id (contest_id),
    key language (language),
    key award_place (award_place),
    key award_points (award_points),
    key created_at (created_at)
)engine=innodb default charset=utf8;

insert into contest_submissions values (default, 1, 1, 'javascript', 'console.log(1)', 14, null, null, now());

down:
drop table contests;
drop table contest_submissions;
