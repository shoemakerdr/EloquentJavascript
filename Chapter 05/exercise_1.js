//Chapter 5: Higher Order Functions

/*
Exercise 1: Flattening

Use the reduce method in combination with the concat method to “flatten” an 
array of arrays into a single array that has all the elements of the input 
arrays.
*/

function flatten(arrays){
  arrays.reduce(function(a,b){
    return a.concat(b);
  });
}