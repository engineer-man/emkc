up:
alter table challenges drop column folder;

down:
alter table challenges add column folder varchar(64) not null
