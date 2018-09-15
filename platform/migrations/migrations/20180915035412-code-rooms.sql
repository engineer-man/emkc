up:
create table code_rooms (
    code_room_id int unsigned not null auto_increment,
    user_id int unsigned null,
    hash varchar(40) not null,
    code mediumtext not null,
    created_at datetime not null,
    primary key (code_room_id),
    key user_id (user_id),
    key hash (hash),
    key created_at (created_at)
)engine=innodb default charset=utf8;

down:
drop table code_rooms;
