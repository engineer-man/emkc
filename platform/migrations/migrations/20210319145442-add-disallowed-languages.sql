up:
alter table contests add disallowed_languages varchar(8192) after output;
update contests set disallowed_languages = 'python2,awk';

down:
alter table contests drop column disallowed_languages;
