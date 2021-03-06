// Chapter Two: Program Structure

/*
Exercise 1: Looping a triangle

Write a loop that makes seven calls to console.log 
to output the following triangle:

#
##
###
####
#####
######
#######

*/


for (var character = "#"; character.length <= 7; character += "#")
    console.log(character);


/*
Exercise 2: FizzBuzz

Write a program that uses console.log to print all the 
numbers from 1 to 100, with two exceptions. For numbers 
divisible by 3, print "Fizz" instead of the number, and for 
numbers divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print 
"FizzBuzz", for numbers that are divisible by both 3 and 5 
(and still print "Fizz" or "Buzz" for numbers divisible by 
only one of those).

*/


for (var number = 1; number <= 100; number++)
    if (number % 3 === 0 && number % 5 === 0) {
        console.log("FizzBuzz");
    }
    else if (number % 3 === 0) {
        console.log("Fizz");
    }
    else if (number % 5 === 0) {
        console.log("Buzz");
    }
    else console.log(number);

/* 
The solution for this exercise as included in Eloquent Javascript is pretty 
different than mine, so I decided to include it here:
*/

for (var n = 1; n <= 100; n++) {
  var output = "";
  if (n % 3 == 0)
    output += "Fizz";
  if (n % 5 == 0)
    output += "Buzz";
  console.log(output || n);
}

/*
NOTES:
What's really interesting to me is that last console.log. The author uses the 
"or" operator. After doing some research, I discovered the concepts of "truthy" 
and falsey. Truthy is generally anything that is not-- false, 0, "", null, 
undefined, or NaN. So in this case, if a number is not divisible by 3 or 5, it'll
return the number rather than the empty string (output) because an empty string 
would be considered falsey.

It's also really cool that the author made it so the conditional statements run 
into each other, concatenating "Fizz" and "Buzz" if both conditionals were 
true.
*/


/*
Exercise 3: Chess board

Write a program that creates a string that represents an 8×8 
grid, using newline characters to separate lines. At each 
position of the grid there is either a space or a “#” 
character. The characters should form a chess board.

Passing this string to console.log should show something 
like this:

 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #
 # # # #
# # # #

When you have a program that generates this pattern, define 
a variable size = 8 and change the program so that it works 
for any size, outputting a grid of the given width and 
height.
*/

/*
Second try at chessboard exercise--- this one fulfills all parameters of
exercise instructions. Initially, the first function I created returned 
several strings that alternated instead of one string that was a complete
board.
*/

var size = 8
var board = "";
for (var height = 0; height < size; height++) {
    for (var width = 0; width < size; width++) {
        if ((height + width) % 2 === 0) {
            board +=" ";
        }
        else board += "#";
    }
    board +="\n";
}
console.log(board);
