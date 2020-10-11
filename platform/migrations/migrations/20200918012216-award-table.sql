up:
create table awards (
    award_id int unsigned not null auto_increment,
    type int unsigned not null,
    points int unsigned not null,
    user_id int unsigned not null,
    ref_type int unsigned null,
    ref_id int unsigned null,
    created_at datetime not null,
    primary key (award_id),
    key type (type),
    key points (points),
    key user_id (user_id),
    key ref_type (ref_type),
    key ref_id (ref_id),
    key created_at (created_at)
)engine=innodb default charset=utf8;

down:
drop table awards;
