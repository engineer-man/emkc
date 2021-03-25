up:
alter table awards convert to character set utf8mb4;
alter table challenge_tests convert to character set utf8mb4;
alter table challenges convert to character set utf8mb4;
alter table cli_scripts convert to character set utf8mb4;
alter table contest_submissions convert to character set utf8mb4;
alter table contests convert to character set utf8mb4;
alter table discord_chat_messages convert to character set utf8mb4;
alter table piston_runs convert to character set utf8mb4;
alter table rmig convert to character set utf8mb4;
alter table snippets convert to character set utf8mb4;
alter table sticker_orders convert to character set utf8mb4;
alter table tags convert to character set utf8mb4;
alter table user_challenges convert to character set utf8mb4;
alter table users convert to character set utf8mb4;

down:
alter table awards convert to character set utf8;
alter table challenge_tests convert to character set utf8;
alter table challenges convert to character set utf8;
alter table cli_scripts convert to character set utf8;
alter table contest_submissions convert to character set utf8;
alter table contests convert to character set utf8;
alter table discord_chat_messages convert to character set utf8;
alter table piston_runs convert to character set utf8;
alter table rmig convert to character set utf8;
alter table snippets convert to character set utf8;
alter table sticker_orders convert to character set utf8;
alter table tags convert to character set utf8;
alter table user_challenges convert to character set utf8;
alter table users convert to character set utf8;
