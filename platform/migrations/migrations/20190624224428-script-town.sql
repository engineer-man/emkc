up:
create table cli_scripts (
    cli_script_id int unsigned not null auto_increment,
    user_id int unsigned not null,
    is_public tinyint unsigned not null default 0,
    is_safe tinyint unsigned not null default 0,
    title varchar(256) not null,
    content mediumtext not null,
    created_at datetime not null,
    primary key (cli_script_id),
    key user_id (user_id),
    key is_public (is_public),
    key is_safe (is_safe),
    key title (title),
    key created_at (created_at)
)engine=innodb default charset=utf8;

down:
drop table cli_scripts;
