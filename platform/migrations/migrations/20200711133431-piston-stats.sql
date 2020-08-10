up:
alter table piston_runs change discord_id user_id varchar(32) not null;
alter table piston_runs add server_id varchar(32) not null after server;

down:
alter table piston_runs change user_id discord_id varchar(32) not null;
alter table piston_runs drop column server_id;
