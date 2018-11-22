up:
alter table users add discord_rank tinyint unsigned default null after discord_api;

down:
alter table users drop column discord_rank;
