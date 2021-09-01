up:
alter table contests drop column draft;

down:
alter table contests add draft tinyint unsigned not null default 1 after contest_id;
