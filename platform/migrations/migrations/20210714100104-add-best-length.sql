up:
alter table contest_submissions add length_best int unsigned not null after length;

down:
alter table contest_submissions drop column length_best;
