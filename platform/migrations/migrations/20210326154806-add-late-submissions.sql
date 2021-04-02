up:
alter table contest_submissions add late boolean default false;

down:
alter table contest_submissions drop column late;
