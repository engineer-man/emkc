up:
alter table users modify avatar_url varchar(128) not null default '/avatars/default.png' after discord_api;

down:
alter table users modify avatar_url varchar(128) null after discord_api;
