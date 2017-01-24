// Chapter Four: Data Structures: Objects and Arrays

/* 
Exercise 1: The sum of a range

The introduction of this book alluded to the following as a nice way to compute 
the sum of a range of numbers:

console.log(sum(range(1, 10)));
Write a range function that takes two arguments, start and end, and returns an 
array containing all the numbers from start up to (and including) end.

Next, write a sum function that takes an array of numbers and returns the sum 
of these numbers. Run the previous program and see whether it does indeed return 
55.

As a bonus assignment, modify your range function to take an optional third 
argument that indicates the “step” value used to build up the array. If no step 
is given, the array elements go up by increments of one, corresponding to the 
old behavior. The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. 
Make sure it also works with negative step values so that range(5, 2, -1) 
produces [5, 4, 3, 2].
*/

function range(start,end){
  var result = [];
  for (;start <= end; start++)
    result.push(start);
  return result;
}

function sum(array){
  var result = 0;
  for (var index = 0; index < array.length; index++)
    result += array[index];
  return result;
}
sum(range(1, 10));

//Bonus range function 3-argument assignment

function range(start,end,increment){
  var result = [];
  if (increment === undefined)
    increment = 1;
  if (increment < 0){
    for (;start >= end; start+=increment)
    result.push(start);
  }
  else for (;start <= end; start+=increment)
    result.push(start);
  return result;
}

/* 
Exercise 2: Reversing an array

Arrays have a method reverse, which changes the array by inverting the order in 
which its elements appear. For this exercise, write two functions, reverseArray 
and reverseArrayInPlace. The first, reverseArray, takes an array as argument 
and produces a new array that has the same elements in the inverse order. The 
second, reverseArrayInPlace, does what the reverse method does: it modifies the 
array given as argument in order to reverse its elements. Neither may use the 
standard reverse method.

Thinking back to the notes about side effects and pure functions in the previous 
chapter, which variant do you expect to be useful in more situations? Which one 
is more efficient?
*/

function reverseArray(array){
  var result = [];
  for (var index = 0; index < array.length; index++)
    result.unshift(array[index]);
  return result;
}

function reverseArrayInPlace(array){
  for (var index = array.length - 2;index >= 0; index--)
    array.push(array[index]);
  for (var counter = 1; counter < array.length; counter++)
    array.shift();
  return array;
}

/*
So, my solution for reverseArray looks pretty much exactly like the solution
from the book. However, the book's version of reverseArrayInPlace looks WAY
different. I've included the author's version below:
*/

function reverseArrayInPlace(array) {
  for (var i = 0; i < Math.floor(array.length / 2); i++) {
    var old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
}

/*
This is pretty obviously a better solution. It does EXACTLY what the function
name says it does: it reverses the values of an array IN PLACE. Mine does not.
It creates a mirror on the other back of the array, and then deletes the
original part of the array (minus) the pivot value (the last value in the
original array).

Thinking on the question of which function is more pure and which would be more
useful: I'm honestly not totally sure. I still need to get a better handle on
concepts like "side effects" and "pure functions."
*/

/*
Exercise 3: A list

Objects, as generic blobs of values, can be used to build all sorts of data 
structures. A common data structure is the list (not to be confused with the 
array). A list is a nested set of objects, with the first object holding a 
reference to the second, the second to the third, and so on.

var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};

A nice thing about lists is that they can share parts of their structure. For 
example, if I create two new values {value: 0, rest: list} and {value: -1, rest: 
list} (with list referring to the variable defined earlier), they are both 
independent lists, but they share the structure that makes up their last three 
elements. In addition, the original list is also still a valid three-element 
list.

Write a function arrayToList that builds up a data structure like the previous 
one when given [1, 2, 3] as argument, and write a listToArray function that 
produces an array from a list. Also write the helper functions prepend, which 
takes an element and a list and creates a new list that adds the element to the 
front of the input list, and nth, which takes a list and a number and returns 
the element at the given position in the list, or undefined when there is no 
such element.

If you haven’t already, also write a recursive version of nth.

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
*/

function arrayToList(array){
  var i = array.length - 2;
  var list = {value: array[array.length - 1], rest: null};
  while (i >= 0){
    var newList = list;
    list = {value: array[i], rest: newList};
    i--;
  }
  return list;
}
arrayToList([10, 20, 30]);

function listToArray(list){
  var array = [];
  for (var node = list; node; node = node.rest)
    array.push(node.value);
  return array;
}
listToArray(arrayToList([10, 20, 30]));

// helper functions

function prepend(element,list){
  var newList = list;
  list = {value: element, rest: newList};
  return list;
}
prepend(10, prepend(20, null));

function nth(list,position){
  var counter = 0;
  for (var node = list; counter <= position; node = node.rest)
    if (counter === position)
      return node.value;
    else counter++;
}
nth(arrayToList([10, 20, 30]), 1);

// recursive version of nth function