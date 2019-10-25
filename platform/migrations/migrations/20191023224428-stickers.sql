up:
create table sticker_orders (
    sticker_order_id int unsigned not null auto_increment,
    is_fulfilled tinyint unsigned not null default 0,
    tx varchar(128) null,
    coupon varchar(128) null,
    quantity int unsigned not null,
    cost decimal(5,2) null,
    name varchar(256) not null,
    email varchar(256) not null,
    address varchar(256) not null,
    created_at datetime not null,
    primary key (sticker_order_id),
    key is_fulfilled (is_fulfilled),
    key created_at (created_at)
)engine=innodb default charset=utf8;

down:
drop table sticker_orders;
