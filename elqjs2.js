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

function triangle() {
    for (var character = "#"; character.length <= 7; character += "#")
        console.log(character);
}

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

function fizzbuzz() {
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
}

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

// First try-- I now realize that this isn't technically correct because it 
// doesn't produce ONE string with the chessboard on it. So I'm gonna try again
// on this one.
function chessboard(size) {
    for (var row = 1; row <= size; row ++) {
        if (row % 2 !== 0){
            var gridOdd = "";
            for (var space = 1; gridOdd.length < size; space++) {
                if (space % 2 !== 0) {
                    gridOdd += " ";
                }
                else gridOdd += "#";
            }
            console.log(gridOdd);
        }
        else {
            var gridEven = "";
            for (var space = 1; gridEven.length < size; space++) {
                if (space % 2 !== 0) {
                    gridEven += "#";
                }
                else gridEven += " ";
            }
            console.log(gridEven);
        }
    }
}
