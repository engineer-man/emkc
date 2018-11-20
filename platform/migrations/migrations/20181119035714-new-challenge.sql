up:
insert into challenges values (4, 3, 50, '4_invalid_json', 'Detect and fix invalid JSON', 'Take an invalid JSON string and figure out where the errors are and make it valid.');
insert into challenges values (5, 2, 30, '5_binary_convert', 'Convert string to binary', 'Take three lowercase letters and print out binary.');

down:
delete from challenges where challenge_id = 4;
delete from challenges where challenge_id = 5;
