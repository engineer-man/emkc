up:
alter table contests add draft tinyint unsigned not null default 1 after contest_id;

down:
alter table contests drop column draft;
