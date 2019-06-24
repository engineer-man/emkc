up:
alter table discord_chat_messages add discord_id varchar(32) not null after user;
alter table discord_chat_messages add index discord_id (discord_id);

down:
alter table discord_chat_messages drop column discord_id;
