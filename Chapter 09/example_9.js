// Chapter 9: Regular Expressions

// Example Code

// created using RegExp constructor
var re1 = new RegExp("abc");
// written as a literal regular expression value
var re2 = /abc/;

// The plus sign has a special meaning in regular expressions, so it must be
// backslashed-escaped.
var eighteenPlus = /eighteen\+/;

// test method for regular expressions will return a Boolean telling you whether
// a string contains a match for a regex pattern
console.log(/abc/.test("abcde"));
// --> true
console.log(/abc/.test("abxde"));
// --> false

// brackets will match any character that is between the brackets
console.log(/[0123456789]/.test("in 1992"));
// --> true
// "-" is used to indicate a range of characters
console.log(/[0-9]/.test("in 1992"));
// --> true

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

// wrapping elements in parentheses indicates that they are a single element 
// (subexpression)-- operators like * or + can be used with them
var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// --> true

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

// \b represents a word boundary but not an actual character
console.log(/cat/.test("concatenate"));
// --> true
console.log(/\bcat\b/.test("concatenate"));
// --> false

// the pipe characer (|) is used between patterns to denote a choice between 
// different patterns in subexpressions
var animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
// --> true
console.log(animalCount.test("15 pigchickens"));
// --> false

// replace is a method for strings-- first arg is the pattern to replace (can 
// be a string or reg ex), and second arg is the string to replace
console.log("papa".replace("p", "m"));
// --> mapa

// will only replace first instance of pattern, unless g option (global) is used
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

var stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) // only one left, remove the 's'
    unit = unit.slice(0, unit.length -1);
  else if (amount == 0)
    amount = "no";
  return amount + " " + unit;
}
