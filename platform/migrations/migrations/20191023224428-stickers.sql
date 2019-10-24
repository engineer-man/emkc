up:
create table sticker_orders (
    sticker_order_id int unsigned not null auto_increment,
    is_paid tinyint unsigned not null default 0,
    quantity int unsigned not null,
    cost decimal(5,2) not null,
    name varchar(256) not null,
    address text not null,
    created_at datetime not null,
    primary key (sticker_order_id),
    key is_paid (is_paid),
    key created_at (created_at)
)engine=innodb default charset=utf8;

down:
drop table sticker_orders;
