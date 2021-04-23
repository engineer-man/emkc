up:
alter table contest_submissions add language_version varchar(32) not null after length;

down:
alter table contest_submissions drop column language_version;
