up:
create table video_requests (
    video_request_id int unsigned not null auto_increment,
    user_id int not null,
    name varchar(255) not null,
    created_at datetime not null,
    primary key (video_request_id),
    key user_id (user_id)
)engine=innodb default charset=utf8;

create table video_request_votes (
    video_request_vote_id int unsigned not null auto_increment,
    video_request_id int unsigned not null,
    user_id int unsigned not null,
    primary key (video_request_vote_id),
    key video_request_id (video_request_id),
    key user_id (user_id)
)engine=innodb default charset=utf8;

down:
drop table video_requests;
drop table video_request_votes;
