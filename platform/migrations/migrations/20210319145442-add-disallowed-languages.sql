up:
alter table contests add disallowed_languages varchar(2048) after output;
update contests set disallowed_languages = 'python2,awk';

down:
alter table contests drop column disallowed_languages;
