up:
insert into challenges values (8, 1, 10, '8_sort_integers', 'Sort the given list of integers in descending order', 'Take a list of integers and print it after sorting it in descending order.');
insert into challenges values (9, 3, 50, '9_roman_numerals', 'Convert the given Roman Numeral to Decimal system of numbers', 'Take a roman numeral(<1000 in value) and print its corresponding value in the decimal system of numbers.');

down:
delete from challenges where challenge_id = 8;
delete from challenges where challenge_id = 9;