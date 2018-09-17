up:
alter table snippets add language varchar(32) not null after hash;
update snippets set language = 'javascript';

down:
alter table snippets drop column language;
