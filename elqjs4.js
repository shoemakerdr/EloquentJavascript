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