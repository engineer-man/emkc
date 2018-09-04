up:
alter table questions add views int unsigned not null default 0 after score;

down:
alter table questions drop column views;
