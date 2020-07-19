up:
create table piston_runs (
    piston_run_id int unsigned not null auto_increment,
    server varchar(64) not null,
    user varchar(32) not null,
    discord_id varchar(32) not null,
    language varchar(32) not null,
    source text,
    created_at datetime not null,
    primary key (piston_run_id),
    key server (server),
    key user (user),
    key discord_id (discord_id),
    key language (language),
    key created_at (created_at)
)engine=innodb default charset=utf8;

down:
drop table piston_runs;
