up:
alter table piston_runs modify server_id varchar(32) null;
alter table piston_runs modify user_id varchar(32) null;

down:

alter table piston_runs modify server_id varchar(32) not null;
alter table piston_runs modify user_id varchar(32) not null;
