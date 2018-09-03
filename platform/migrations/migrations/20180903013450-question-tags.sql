up:
create table question_tags (
    question_tag_id int unsigned not null auto_increment,
    question_id int not null default 0,
    tag_id int not null default 0,
    primary key (question_tag_id),
    key question_id (question_id),
    key tag_id (tag_id)
)engine=innodb default charset=utf8;

down:
drop table question_tags;
