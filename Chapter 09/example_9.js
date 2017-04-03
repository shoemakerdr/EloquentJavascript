// Chapter 9: Regular Expressions

// Example Code

// CREATING A REGULAR EXPRESSION

// created using RegExp constructor
var re1 = new RegExp("abc");
// written as a literal regular expression value
var re2 = /abc/;

// The plus sign has a special meaning in regular expressions, so it must be
// backslashed-escaped.
var eighteenPlus = /eighteen\+/;

// TESTING FOR MATCHES

// test method for regular expressions will return a Boolean telling you whether
// a string contains a match for a regex pattern
console.log(/abc/.test("abcde"));
// --> true
console.log(/abc/.test("abxde"));
// --> false

// MATCHING A SET OF CHARACTERS

// brackets will match any character that is between the brackets
console.log(/[0123456789]/.test("in 1992"));
// --> true
// "-" is used to indicate a range of characters
console.log(/[0-9]/.test("in 1992"));
// --> true

/*
Common character groups

\d  --> any digit character
\w  --> and alphanumeric character
\s  --> any whitespace character (space, tab, newline, etc)
\D  --> any nondigit character
\W  --> any nonalphanumeric character
\S  --> any nonwhitespace character
.   --> any character except newline

*/

// using "\d" backslash code instead of [0-9]
var dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("30-01-2003 15:20"));
// --> true
console.log(dateTime.test("30-jan-2003 15:20"));
// --> false

// using a caret symbol (^) to invert a set of bracket-surrounded characters
var notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// --> false
console.log(notBinary.test("1100100010200110"));
// --> true

// REPEATING PARTS OF A PATTERN

// plus sign (+) indicates a pattern may be repeated more than once
console.log(/'\d+'/.test("'123'"));
// --> true
console.log(/'\d+'/.test("''"));
// --> false
// asterisk (*) indicates that a pattern may be repeated zero or more times
console.log(/'\d*'/.test("'123'"));
// --> true
console.log(/'\d*'/.test("''"));
// --> true

// question mark (?) indicates that part of patter can occur zero or one time
var neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// --> true
console.log(neighbor.test("neighbor"));
// --> true

// Curly braces indicate a precise number of times something can occur or a
// range if used with a comma (ex. {1,4}). Used with no number after the comma
// indicates an open-ended range (ex. {5,} occurs AT LEAST 5 times).
var dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("30-1-2003 8:45"));
// --> true

// GROUPING SUBEXPRESSIONS

// wrapping elements in parentheses indicates that they are a single element 
// (subexpression)-- operators like * or + can be used with them
var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// --> true

// MATCHES AND GROUPS

// execute (exec) method returns an object with information about the match or
// null if no match found
var match = /\d+/.exec("one two 100");
console.log(match);
// --> ["100"]
console.log(match.index);
// --> 8

// Strings have a "match" method that behaves similarly
console.log("one two 100".match(/\d+/));
// --> ["100"]

// When using the exec method with subexpressions, the first entry in the return
// object will be the whole match, then the following entries will be the
// particular matches from each subexpression. If no matches for the 
// subexpression, the entry will read "undefined."
var quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// --> ["'hello'", "hello"]

// If no matches for the subexpression, the entry will read "undefined."
console.log(/bad(ly)?/.exec("bad"));
// --> ["bad", undefined]
// If subexpression matches multiple times, only the last match goes in the 
// array
console.log(/(\d)+/.exec("123"));
// --> ["123", "3"]

// THE DATE TYPE

// calling new Date with no arguments returns current date and time
console.log(new Date());

// with arguments, it creates an object for a specific time-- note that month
// numbers start at 0 rather than 1
console.log(new Date(2009, 11, 9));
// --> Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// --> Wed Dec 09 2009 12:59:59 GMT+0100 (CET)

// getTime method returns Unix time-- measured in milliseconds since start of
// 1970, using negative numbers before 1970
console.log(new Date(2013, 11, 19).getTime());
// --> 1387407600000
console.log(new Date(1387407600000));
// --> Thu Dec 19 2013 00:00:00 GMT+0100 (CET)

// function to find date from a string and turn it into a new Date object
function findDate(string) {
  // assign regular expression to a variable
  var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
  // assign array match to variable, each subexpression match will be after 
  // first slot in array
  var match = dateTime.exec(string);
  return new Date(Number(match[3]), 
                  Number(match[2])-1, // months are 0-11
                  Number(match[1]));
}
console.log(findDate("30-1-2003"));
// --> Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

// WORD AND STRING BOUNDARIES

// \b represents a word boundary but not an actual character
console.log(/cat/.test("concatenate"));
// --> true
console.log(/\bcat\b/.test("concatenate"));
// --> false

// CHOICE PATTERNS

// the pipe characer (|) is used between patterns to denote a choice between 
// different patterns in subexpressions
var animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
// --> true
console.log(animalCount.test("15 pigchickens"));
// --> false

// THE REPLACE METHOD

// replace is a method for strings-- first arg is the pattern to replace (can 
// be a string or reg ex), and second arg is the string or function to replace
console.log("papa".replace("p", "m"));
// --> mapa

// will only replace first instance of pattern, unless g option (global) is 
// used. Global option seems to work almost like forEach method.
console.log("Borobudur".replace(/[ou]/, "a"));
// --> Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// --> Barabadar

// $1 and $2 refer to subexpressions in match, with $1 being the first
// subexpression match, $2 the second, etc etc all the way up to $9. $& can be 
// used to refer to the whole match
console.log("Hopper, Grace\nMcCarthy, John\nRitchie, Dennis"
            .replace(/([\w]+), ([\w]+)/g, "$2 $1"));
// --> Grace Hopper
//     John McCarthy
//     Dennis Ritchie

// Functions can be passed as 2nd arguments in the replace method
var s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
  return str.toUpperCase();
}));
// --> the CIA and FBI

// more complex example of above principle
var stock = "1 lemon, 2 cabbages, and 101 eggs";
// amount is the (\d+) group, unit is the (\w+) group
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1; // converts string of number match into number
  if (amount == 1) // only one left, remove the 's'
    unit = unit.slice(0, unit.length -1); // takes of last letter-- "s"
  else if (amount == 0)
    amount = "no";
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

// GREED

// Repetition operators (+, *, ?, and {}) are considered greedy operators because
// they match as much as they can, then backtrack from there. In the last
// instance, the [^]* tries to match as much as possible, which in this case,
// includes all of the remaining "/*" and */" instances. It will then backtrack,
// and start looking for the "*/" match. It will match one character less each
// time until it finds the last instance of the "*/" match.
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// --> 1 + 3
console.log(stripComments("x = 10; // ten!"));
// --> x = 10
console.log(stripComments("1 /* a */+/* b */ 1")); // should get 1 + 1
// --> 1 1

// By adding ? to repetition operators, they match as little as possible, and
// increment up one character when the remaining pattern does not fit the 
// smaller match. In this case, it matches each character until it reaches the
// "*/" part of the pattern. Once it reaches that first instance, it returns
// that match.
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */ + /* b */ !"));
// --> 1 + 1

// DYNAMICALLY CREATING REGEXP OBJECTS

// Using RegExp constructor, you can dynamically insert string values as 
// variables through concatenation. 
var name = "harry";
var text = "Harry is a suspicious character.";
// You have to use an extra \ in the boundary markers because they will be 
// otherwise escaped since it is a string value
var regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// --> _Harry_ is a suspicious character

// In this example, the name has multiple characters that need to be escaped
// in the constructor string argument. To work around this, we can use the
// replace method to change the name string to one with escape characters in
// front of characters that are actually included in the name.
var name = "dea+hl[]rd";
var text = "This dea+hl[]rd guy is super annoying."
// With this regular expression, we will match everything that is not a word
// character or whitespace character, and put "\\" in front of it, so it is 
// properly escaped when it is concatenated.
var escaped = name.replace(/[^\w\s]/g, "\\$&");
var regexp = new RegExp ("\\b(" + escaped + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// --> This _dea+hl[]rd_ guy is super annoying.

// THE SEARCH METHOD

// The search method is similar to the indexOf method. It returns the first
// index where the expression was found or -1 if not found.
console.log("  word".search(/\S/));
//  --> 2
console.log("    ".search(/\S/));
// --> -1

// THE LASTINDEX PROPERTY

var pattern = /y/g;
pattern.lastIndex = 3;
var match = pattern.exec("xyzzy");
console.log(match.index);
// --> 4
console.log(pattern.lastIndex);
// --> 5

var digit = /\d/g;
console.log(digit.exec("here it is: 1"));
// --> ["1"]
console.log(digit.exec("and now: 1"));
// --> null

console.log("Banana".match(/an/g));
// --> ["an", "an"]

// LOOPING OVER MATCHES

var input = "A string with 3 numbers in it... 42 and 88.";
var number = /\b(\d+)\b/g;
var match;
while (match = number.exec(input))
  console.log("Found", match[1], "at", match.index);
// --> Found 3 at 14
//     Found 42 at 33
//     Found 88 at 40

// PARSING AN INI FILE

/*
__INI file format__

searchengine=http://www.google.com/search?q=$1
spitefulness=9.7
; comments are preceded by at semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[gargamel]
fullname=Gargamel
type=evil sorcerer
outputdir=/home/marijn/enemies/gargamel
*/

// Rules of INI file
// * Blank lines and lines starting with semicolons are ignored
// * Lines wrapped in [ and ] start a new section
// * Lines containing an alphanumeric identifiier followed by an = characer add a 
// * setting to the current section
// * Anything else is invalid

function parseINI(string) {
  // Start with an object to hold the top-level fields
  var currentSection = {name: null, fields: []};
  var categories = [currentSection];
  
  string.split(/\r?\n/).forEach(function(line) {
    var match;
    if (/^\s*(:.*)?$/.test(line)) {
      return;
    } else if (match = line.match(/^\[(.*)\]$/)) {
      currentSection = {name: match[1], fields: []};
      categories.push(currentSection);
    } else if (match = line.match(/^(\w+)=(.*)$/)) {
      currentSection.fields.push({name: match[1],
                                  value: match[2]});
    } else {
      throw new Error("Line '" + line + "' is invalid.");
    }
  });
  return categories;
}

// SUMMARY

//    /abc/	        A sequence of characters
//    /[abc]/	      Any character from a set of characters
//    /[^abc]/      Any character not in a set of characters
//    /[0-9]/	      Any character in a range of characters
//    /x+/	        One or more occurrences of the pattern x
//    /x+?/	        One or more occurrences, nongreedy
//    /x*/	        Zero or more occurrences
//    /x?/	        Zero or one occurrence
//    /x{2,4}/	    Between two and four occurrences
//    /(abc)/	      A group
//    /a|b|c/	      Any one of several patterns
//    /\d/	        Any digit character
//    /\w/	        An alphanumeric character (“word character”)
//    /\s/	        Any whitespace character
//    /./	          Any character except newlines
//    /\b/	        A word boundary
//    /^/	          Start of input
//    /$/	          End of input