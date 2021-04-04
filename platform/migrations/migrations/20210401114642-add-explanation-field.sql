up:
alter table contest_submissions add explanation mediumtext not null after length;

down:
alter table contest_submissions drop column explanation;
