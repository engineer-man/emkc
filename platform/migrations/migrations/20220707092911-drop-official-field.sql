up:
alter table challenge_tests drop column official;

down:
alter table challenge_tests add column official tinyint(1) default null;

