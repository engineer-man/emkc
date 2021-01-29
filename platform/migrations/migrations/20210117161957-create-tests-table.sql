up:
create table challenge_tests (
    challenge_test_id int unsigned not null auto_increment,
    challenge_id int unsigned not null,
    official boolean,
    name varchar(128) not null,
    input text not null,
    output text not null,
    primary key (challenge_test_id),
    key challenge_id (challenge_id)
)engine=innodb default charset=utf8;
insert into challenge_tests (challenge_id, official, name, input, output)
values (1, false, 'Testing simple string',
'engineer man
cat
reverse me :)
1234567890a',
'nam reenigne
tac
): em esrever
a0987654321');
insert into challenge_tests (challenge_id, official, name, input, output)
values (1, false, 'Testing complex string',
'a,masd#$)(&*09&M0d7fn0s8$*&4876%*&7dnosydhf)
===================****#$#$
sd9f6 9s8d6f9 8 s
78^*&^((((((((((((((()))))))))))))))',
')fhdysond7&*%6784&*$8s0nf7d0M&90*&()$#dsam,a
$#$#****===================
s 8 9f6d8s9 6f9ds
)))))))))))))))(((((((((((((((^&*^87');
insert into challenge_tests (challenge_id, official, name, input, output)
values (2, false, 'String of numbers',
'738923a
897494889999a
0004953945000a
7575847577777a',
'3
9
0
7');
insert into challenge_tests (challenge_id, official, name, input, output)
values (3, false, 'Testing short lists',
'2,5,1
1,4,5
-2,4,-9',
'8
10
-7');
insert into challenge_tests (challenge_id, official, name, input, output)
values (3, false, 'Testing long lists',
'3,9,10,5,2,7,9,2
3,32,10,5,2,2,9,12,19,49,6,145
-3,9,-10,19,-5,-21,9,-4',
'47
294
-6');
insert into challenge_tests (challenge_id, official, name, input, output)
values (4, false, 'Single Problem',
'{"name":"em"
"name":"somebody"}
{"doggo":"chase}
{"name":"em" "doggo":"chase"}',
'{"name":"em"}
{"name":"somebody"}
{"doggo":"chase"}
{"name":"em","doggo":"chase"}');
insert into challenge_tests (challenge_id, official, name, input, output)
values (4, false, 'Multiple Problems',
'"name":"em
"doggo":chase""name":"em',
'{"name":"em"}
{"doggo":"chase","name":"em"}');
insert into challenge_tests (challenge_id, official, name, input, output)
values (5, false, 'Single Problem',
'abc
nwv
pdu
xns
jfj
nnd',
'011000010110001001100011
011011100111011101110110
011100000110010001110101
011110000110111001110011
011010100110011001101010
011011100110111001100100');
insert into challenge_tests (challenge_id, official, name, input, output)
values (6, false, 'Testing small numbers',
'3|2
8|4
5|3',
'5,8
13,21,34,55
8,13,21');
insert into challenge_tests (challenge_id, official, name, input, output)
values (6, false, 'Testing large numbers',
'34|9
233|14
377|6',
'55,89,144,233,377,610,987,1597,2584
377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418
610,987,1597,2584,4181,6765');
insert into challenge_tests (challenge_id, official, name, input, output)
values (7, false, 'Testing permutations',
'engineer,gireneen
cat,act
e1m2k3c4,e2k3m14c',
'Yes
Yes
Yes');
insert into challenge_tests (challenge_id, official, name, input, output)
values (7, false, 'Testing non-permutations',
'14467,42641
qwerty,qeerty',
'No
No');
insert into challenge_tests (challenge_id, official, name, input, output)
values (8, false, 'Testing short lists',
'2,5,1
-2,22,-3
3,4,-9',
'5,2,1
22,-2,-3
4,3,-9');
insert into challenge_tests (challenge_id, official, name, input, output)
values (8, false, 'Testing long lists',
'3,9,10,5,2,7,9,2
3,32,10,5,2,2,9,-5,12,19,49,6,145,-2,-1
-3,9,-10,19,-5,-21,9,-4',
'10,9,9,7,5,3,2,2
145,49,32,19,12,10,9,6,5,3,2,2,-1,-2,-5
19,9,9,-3,-4,-5,-10,-21');
insert into challenge_tests (challenge_id, official, name, input, output)
values (9, false, 'Testing small Roman Numerals',
'VI
XII
III
I',
'6
12
3
1');
insert into challenge_tests (challenge_id, official, name, input, output)
values (9, false, 'Testing large Roman Numerals',
'CDVII
CMXCVII
DCXLIII
DCCCLXXVI',
'407
997
643
876');
insert into challenge_tests (challenge_id, official, name, input, output)
values (10, false, 'Testing small phrases',
'ig-pay atin-lay
engineeryay an-may
ave-hay un-fay
idden-hay essage-may
illy-say anguage-lay',
'pig latin
engineer man
have fun
hidden message
silly language');
insert into challenge_tests (challenge_id, official, name, input, output)
values (10, false, 'Testing large phrases',
'isyay ift-sway ayay ood-gay anguage-lay
ucks-day areyay etty-pray ool-cay
is-thay isyay o-say andom-ray at-whay amyay iyay oing-day
ig-pay atin-lay isyay usedyay inyay ools-schay o-tay each-tay anguage-lay onstructs-cay
ityay isyay illy-say ut-bay ort-say ofyay un-fay or-fay ildren-chay',
'is swift a good language
ducks are pretty cool
this is so random what am i doing
pig latin is used in schools to teach language constructs
it is silly but sort of fun for children');
insert into challenge_tests (challenge_id, official, name, input, output)
values (11, false, 'Testing short list',
'1,7,4|6,3,8
9,2|10,5
5,3,9|4,8,10
2,4,6|3,8,10',
'1,6,7,3,4,8
9,10,2,5
5,4,3,8,9,10
2,3,4,8,6,10');
insert into challenge_tests (challenge_id, official, name, input, output)
values (11, false, 'Testing long list',
'1,119,37,17,64,120,24,55,500,255|5,40,21,135,32,110,121,68,300,1000
279,378,150,800,5,1337,5,8,12,56|6,7,312,10,15,80,385,231,986,1338',
'1,5,119,40,37,21,17,135,64,32,120,110,24,121,55,68,500,300,255,1000
279,6,378,7,150,312,800,10,5,15,1337,80,5,385,8,231,12,986,56,1338');
insert into challenge_tests (challenge_id, official, name, input, output)
values (12, false, 'Regular',
'run,barn,yellow,barracuda,shark,fish,swim
america,united,kingdom,mexico,canada,AUSTRalia
Meatballs,Noodles,Pizza,Porter,Reuben,Toast,Wine,walnuts,lamb,kale,jerky',
'barracuda
australia
meatballs');
insert into challenge_tests (challenge_id, official, name, input, output)
values (12, false, 'Same Size',
'fishes,sam,gollum,sauron,frodo,balrog
rUnNiNg   ,swimming,    eating,biking,   climbing',
'fishes,gollum,sauron,balrog
swimming,climbing');
insert into challenge_tests (challenge_id, official, name, input, output)
values (13, false, 'Testing short strings',
'Engineer man
Chocolate bar
Weetabix',
'n
o,a
e');
insert into challenge_tests (challenge_id, official, name, input, output)
values (13, false, 'Testing long strings',
'tttt::::::tt::t::t:::t:t:
lllasllsllslsllsllslslslal
llllttttnabcefghigklmnop',
':
l
l');
insert into challenge_tests (challenge_id, official, name, input, output)
values (14, false, 'Testing short numbers',
'3
17
57',
'odd
even
even');
insert into challenge_tests (challenge_id, official, name, input, output)
values (14, false, 'Testing long numbers',
'74739
337394
3739203',
'even
odd
odd');
insert into challenge_tests (challenge_id, official, name, input, output)
values (15, false, 'Regular Cookie',
'10101111,10011101111001011010111111110011
00010100,1011111100010100100000001111100101111111
10100011,101000111010011100111100',
'39
23
7');
insert into challenge_tests (challenge_id, official, name, input, output)
values (15, false, 'Big Cookie',
'011011000110111101101100,101110001111001010100001011110010110110001101111011011000010011000000101
0110100001101001,1111010000000011011010000110100101101001010100100101110001100001',
'87
47');
insert into challenge_tests (challenge_id, official, name, input, output)
values (16, false, 'Spiral Corner Sum',
'2x2
3x3
4x4
5x5',
'10
24
46
76');
insert into challenge_tests (challenge_id, official, name, input, output)
values (16, false, 'Spiral Corner Sum',
'24x24
25x25',
'2166
2356');
insert into challenge_tests (challenge_id, official, name, input, output)
values (17, false, 'Real',
'1x^2-1x-6=0
x^2-6x+9=0
2x^2-6x-7=0
9x^2-6x-7=0
9x^2+6x-7=0
-3x^2+1x+7=0',
'3,-2
3,3
3.89791,-0.89791
1.27614,-0.60947
0.60947,-1.27614
-1.36992,1.70325');
insert into challenge_tests (challenge_id, official, name, input, output)
values (17, false, 'Imaginary',
'2x^2-6x+7=0
3x^2+1x+7=0
9x^2+9x+7=0
-9x^2-9x-7=0',
'imaginary,imaginary
imaginary,imaginary
imaginary,imaginary
imaginary,imaginary');

down:
drop table challenge_tests;
