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

// wrapping elements in parentheses indicates that they are a single element--
// operators like * or + can be used with them
var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// --> true

