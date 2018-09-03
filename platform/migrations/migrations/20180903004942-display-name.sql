up:
alter table users add display_name varchar(64) not null after is_staff;
update users set display_name = username;

down:
alter table users drop column display_name;
