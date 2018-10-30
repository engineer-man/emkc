up:
create table discord_chat_messages (
    discord_chat_message_id int unsigned not null auto_increment,
    hash varchar(40) not null,
    channel varchar(32) not null,
    user varchar(32) not null,
    message varchar(8192) not null,
    created_at datetime not null,
    primary key (discord_chat_message_id),
    unique hash (hash),
    key channel (channel),
    key user (user),
    key created_at (created_at)
)engine=innodb default charset=utf8;

down:
drop table discord_chat_messages;
