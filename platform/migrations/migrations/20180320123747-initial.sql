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

down:
drop table users;
