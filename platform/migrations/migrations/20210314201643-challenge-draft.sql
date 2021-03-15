up:
alter table challenges add draft tinyint unsigned not null default 1 after challenge_id;
update challenges set draft = 0;

down:
alter table challenges drop column draft;
