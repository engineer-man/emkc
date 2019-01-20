up:
insert into challenges values (6, 2, 30, '6_fibonacci_sequence', 'Fibonacci Numbers', 'Start with one Fibonacci sequence number, then calculate more from there.');
insert into challenges values (7, 2, 30, '7_check_permutation', 'Check scrambled string', 'Given two strings of equal length, figure out if one is a scramble of the other.');

down:
delete from challenges where challenge_id = 6;
delete from challenges where challenge_id = 7;
