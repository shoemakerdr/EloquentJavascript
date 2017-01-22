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