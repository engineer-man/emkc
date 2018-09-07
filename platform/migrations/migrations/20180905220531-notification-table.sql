up:
create table notifications (
    notification_id int unsigned not null auto_increment,
    user_id int unsigned not null,
    type tinyint unsigned not null,
    entity_type tinyint unsigned not null,
    entity_id int unsigned not null,
    message varchar(512) not null,
    created_at datetime not null,
    primary key (notification_id),
    key user_id (user_id),
    key type (type),
    key entity_type (entity_type),
    key entity_id (entity_id)
)engine=innodb default charset=utf8;

down:
drop table notifications;
