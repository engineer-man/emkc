up:
alter table contest_submissions add explanation mediumtext default '' after length;

down:
alter table contest_submissions drop column explanation;
