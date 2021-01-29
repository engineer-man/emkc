up:
alter table challenges add html mediumtext default null after description;
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable could contain a variety of string values. Regardless of value, you''ll need to
        reverse the string and print it out.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <span class="badge badge-info">value1</span><br />
            The string to reverse
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Simple string</div>
            <div class="wrap"><span class="badge badge-info">value1</span> cat</div>
            <div class="wrap"><span class="badge badge-dark">output</span> tac</div>
        </div>
        <div class="test_case">
            <div class="f700">Complex string</div>
            <div class="wrap"><span class="badge badge-info">value1</span> sd#$)(&*09&M0</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 0M&90*&()$#ds</div>
        </div>
    </div>
</div>
' where folder = '1_reverse_string';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable will be a string of many numbers. You''ll need to print out the number which appears the
        most times in that string.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <span class="badge badge-info">value1</span><br />
            String of numbers
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">String of numbers</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 08989082882348823838</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 8</div>
        </div>
    </div>
</div>
' where folder = '2_number_frequency';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable could contain a list of integer values. Regardless of value, you''ll need to
        print out the sum of the list.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <span class="badge badge-info">value1</span><br />
            The list to add
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Short list</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 2,5,1</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 8</div>
        </div>
        <div class="test_case">
            <div class="f700">Long list</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 3,9,10,5,2,7,9,2</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 47</div>
        </div>
    </div>
</div>
' where folder = '3_list_sum';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable will contain a string of invalid JSON. However, each invalid JSON string received can be fixed
        by making one or more single character changes. Only three possible things may be wrong with the JSON string:
        1) missing leading or trailing brace, 2) unquoted JSON string value, 3) missing comma between properties.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <span class="badge badge-info">value1</span><br />
            A string of invalid JSON
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Single Problem</div>
            <div class="wrap"><span class="badge badge-info">value1</span> {"name":"em"</div>
            <div class="wrap"><span class="badge badge-dark">output</span> {"name":"em"}</div>
        </div>
        <div class="test_case">
            <div class="f700">Multiple Problems</div>
            <div class="wrap"><span class="badge badge-info">value1</span> "name":"em</div>
            <div class="wrap"><span class="badge badge-dark">output</span> {"name":"em"}</div>
        </div>
    </div>
</div>
' where folder = '4_invalid_json';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable will contain a string of three lowercase letters. From this, you''ll need to convert it
        to binary and print out the 24 number representation of those letters in binary.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <span class="badge badge-info">value1</span><br />
            Three lowercase letters
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Case</h4>

        <div class="test_case">
            <div class="f700">Letter</div>
            <div class="wrap"><span class="badge badge-info">value1</span> abc</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 011000010110001001100011</div>
        </div>
    </div>
</div>
' where folder = '5_binary_convert';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable will contain a fibonacci sequence number. Your job is to calculate the next n digits.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <p>
                <span class="badge badge-info">value1</span><br />
                The starting number
            </p>
            <p>
                <span class="badge badge-info">value2</span><br />
                n number to calculate after value1
            </p>
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Small Number</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 5</div>
            <div class="wrap"><span class="badge badge-info">value2</span> 2</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 8,13</div>
        </div>
        <div class="test_case">
            <div class="f700">Large Numbers</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 34</div>
            <div class="wrap"><span class="badge badge-info">value2</span> 7</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 55,89,144,233,377,610,987</div>
        </div>
    </div>
</div>
' where folder = '6_fibonacci_sequence';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable will contain two strings of equal length, separated by a comma. You have
        to check whether the second string is a permutation of the first string. Print "Yes" if it is,
        "No" if not.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <span class="badge badge-info">value1</span><br />
            Two strings separated by a comma
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Case</h4>

        <div class="test_case">
            <div class="f700">Permutation</div>
            <div class="wrap"><span class="badge badge-info">value1</span> brian,airbn</div>
            <div class="wrap"><span class="badge badge-dark">output</span> Yes</div>
        </div>
    </div>
</div>
' where folder = '7_check_permutation';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable will contain a list of integers, you have to sort the list in descending
        order and print it.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <span class="badge badge-info">value1</span><br />
            The list to sort
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Short list</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 3,4,-9</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 4,3,-9</div>
        </div>
        <div class="test_case">
            <div class="f700">Long list</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 3,9,10,5,2,7,9,2</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 10,9,9,7,5,3,2,2</div>
        </div>
    </div>
</div>
' where folder = '8_sort_integers';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable will contain a roman numeral less than 1000 in value. Print the
        corresponding value of the roman numeral in the decimal system of numbers.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <span class="badge badge-info">value1</span><br />
            The roman numeral
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Small Roman Numeral</div>
            <div class="wrap"><span class="badge badge-info">value1</span> VI</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 6</div>
        </div>
        <div class="test_case">
            <div class="f700">Large Roman Numeral</div>
            <div class="wrap"><span class="badge badge-info">value1</span> CDVII</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 407</div>
        </div>
    </div>
</div>
' where folder = '9_roman_numerals';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        Your input variable will contain a sentence/phrase in pig latin. Your job is to translate it to english. You add "yay" if the word starts with a vowel. Otherwise move the starting consonant sequence (w, wr, sch, ...) to the end of the word and add "ay" plus a dash.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <span class="badge badge-info">value1</span><br />
            Sentence/phrase in pig latin.
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Short phrase</div>
            <div class="wrap"><span class="badge badge-info">value1</span> ayay imple-say est-tay ase-cay</div>
            <div class="wrap"><span class="badge badge-dark">output</span> a simple test case</div>
        </div>
        <div class="test_case">
            <div class="f700">Long phrase</div>
            <div class="wrap"><span class="badge badge-info">value1</span> ig-pay atin-lay isyay usedyay inyay ools-schay o-tay each-tay anguage-lay onstructs-cay</div>
            <div class="wrap"><span class="badge badge-dark">output</span> pig latin is used in schools to teach language constructs</div>
        </div>
    </div>
</div>
' where folder = '10_pig_latin';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        You''ll get two inputs, each will be a comma separated list of numbers. Each input will contain
        the same amount of numbers. You''ll need to merge the two lists by inserting numbers from value2 into value1.
        Each number from value2 should be inserted every other number starting after the first number in value 1.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <p>
                <span class="badge badge-info">value1</span><br />
                First comma separated list of numbers
            </p>
            <p>
                <span class="badge badge-info">value2</span><br />
                Second comma separated list of numbers
            </p>
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Short List</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 9,5</div>
            <div class="wrap"><span class="badge badge-info">value2</span> 7,10</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 9,7,5,10</div>
        </div>
        <div class="test_case">
            <div class="f700">Large List</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 34,18,4,102</div>
            <div class="wrap"><span class="badge badge-info">value2</span> 15,19,120,64</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 34,15,18,19,4,120,102,64</div>
        </div>
    </div>
</div>
' where folder = '11_array_neighbor';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        You''ll get one input, a string with multiple words. Return the longest word in the string. If the input
        contains multiple words that are the largest length, return a string that contains all of the words in
        the same order they are provided.

        All returned strings should be lowercase and trimmed of whitespace.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <p>
                <span class="badge badge-info">value1</span><br />
                Single string with multiple words.
            </p>
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Regular</div>
            <div class="wrap"><span class="badge badge-info">value1</span> run,barn,yellow,barracuda,shark,fish,swim</div>
            <div class="wrap"><span class="badge badge-dark">output</span> barracuda</div>
        </div>
        <div class="test_case">
            <div class="f700">Same Size</div>
            <div class="wrap"><span class="badge badge-info">value1</span> fishes,sam,gollum,sauron,frodo,balrog</div>
            <div class="wrap"><span class="badge badge-dark">output</span> fishes,gollum,sauron,balrog</div>
        </div>
    </div>
</div>
' where folder = '12_longest_word';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>
        You will be given a string and your job is to find the most common character in that
        string. If there are two characters which appear the same amount of times and are the
        largest amount, you should output both separated by a comma in the order they first appeared.
    </div>
    <div class="section">
        <h4 class="f300">Inputs</h4>
        <div class="input">
            <span class="badge badge-info">value1</span><br />
            A long or short string
        </div>
    </div>
    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>
        <div class="test_case">
            <div class="f700">Short phrase</div>
            <div class="wrap"><span class="badge badge-info">value1</span> A test case</div>
            <div class="wrap"><span class="badge badge-dark">output</span> t,e,s</div>
        </div>
        <div class="test_case">
            <div class="f700">Long phrase</div>
            <div class="wrap"><span class="badge badge-info">value1</span> The way this mode works is by looking for the mode of the characters of any given string</div>
            <div class="wrap"><span class="badge badge-dark">output</span> o</div>
        </div>
    </div>
</div>
' where folder = '13_most_common_character';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>
        You will be given an integer and your job is to determine the sum made up by each individual digit.
        Once you have the sum, determine if the sum is even or odd and then print out either "even" or "odd".
    </div>
    <div class="section">
        <h4 class="f300">Inputs</h4>
        <div class="input">
            <span class="badge badge-info">value1</span><br />
            An integer
        </div>
    </div>
    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>
        <div class="test_case">
            <div class="f700">Short number</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 31</div>
            <div class="wrap"><span class="badge badge-dark">output</span> even</div>
        </div>
        <div class="test_case">
            <div class="f700">Long number</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 662638</div>
            <div class="wrap"><span class="badge badge-dark">output</span> odd</div>
        </div>
    </div>
</div>
' where folder = '14_number_digit_sum';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        You''ll get one input string formatted as ''[cookie],[cookie jar]''. Return the sum of the starting index number of the
        cookie in the cookie jar and the ending index number of the cookie in the cookie jar.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <p>
                <span class="badge badge-info">value1</span><br />
                Single string formatted as ''[cookie],[cookie jar]''.
            </p>
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Regular Cookie</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 10000101,100001111000010110100001</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 23</div>
        </div>
        <div class="test_case">
            <div class="f700">Big Cookie</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 1010100100110110,1111010000011111111000111010100100110110</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 63</div>
        </div>
    </div>
</div>
' where folder = '15_binary_cookie';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>
        Given a size for a number spiral, you count clockwise with numbers. A 3x3 is 3 columns by 3 rows.
        <pre class="easy">
        2x2  3x3    4x4
        1 2  7 8 9   7  8  9 10
        4 3  6 1 2   6  1  2 11
             5 4 3   5  4  3 12
                    16 15 14 13</pre>
        The input gives you the size of the spiral that you need to create. The goal is to sum the corners. If you
        look at the 3x3 grid, the numbers at the corners are 7, 9, 3, and 5. If you sum these, you get 24, which is
        the answer. Write a program that will provide the sum of the corners for any sized spiral up to 100x100.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <p>
                <span class="badge badge-info">value1</span><br />
                Single string formatted as ''numberxnumber''.
            </p>
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Sample Input 1</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 3x3</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 24</div>
        </div>
        <div class="test_case">
            <div class="f700">Sample Input 2</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 4x4</div>
            <div class="wrap"><span class="badge badge-dark">output</span> 46</div>
        </div>
    </div>
</div>
' where folder = '16_spiral_corner';
update challenges set html = '<div class="em_challenge_abstract">
    <div class="section">
        <h4 class="f300">Instructions</h4>

        You''ll get one input string formatted like ''ax^2+bx+c=0''. Return the two decimal values of x like ''x_value1,x_value2''.
    </div>

    <div class="section">
        <h4 class="f300">Inputs</h4>

        <div class="input">
            <p>
                <span class="badge badge-info">value1</span><br />
                Single string formatted like ''ax^2+bx+c=0''.
            </p>
        </div>
    </div>

    <div class="section">
        <h4 class="f300">Sample Test Cases</h4>

        <div class="test_case">
            <div class="f700">Real</div>
            <div class="wrap"><span class="badge badge-info">value1</span> -9x^2-9x+7=0</div>
            <div class="wrap"><span class="badge badge-dark">output</span> -1.51379,-1.51379</div>
        </div>
        <div class="test_case">
            <div class="f700">Imaginary</div>
            <div class="wrap"><span class="badge badge-info">value1</span> 8x^2-9x+9=0</div>
            <div class="wrap"><span class="badge badge-dark">output</span> imaginary,imaginary</div>
        </div>
    </div>
</div>
' where folder = '17_quadratic_calculator';

down:
alter table challenges drop column html;
