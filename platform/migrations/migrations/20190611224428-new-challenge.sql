up:
insert into challenges values (11, 2, 30, '11_array_neighbor', 'Special array merge', 'Merge two arrays according to special rules.');
update challenges set difficulty = 3, points = 50 where challenge_id = 10;

down:
update challenges set difficulty = 1, points = 10 where challenge_id = 10;
delete from challenges where challenge_id = 11;
