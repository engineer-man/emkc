up:
alter table contest_submissions add late tinyint unsigned default 0;

down:
alter table contest_submissions drop column late;
