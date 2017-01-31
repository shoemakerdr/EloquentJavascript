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

/*
Exercise 2: Mother-child age difference

Using the example data set from this chapter, compute the average age difference
between mothers and children (the age of the mother when the child is born). You
can use the average function defined earlier in this chapter.

Note that not all the mothers mentioned in the data are themselves present in 
the array. The byName object, which makes it easy to find a person’s object from
their name, might be useful here.
*/