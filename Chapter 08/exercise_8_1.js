// Chapter 7: Bugs and Error Handling

/*
Exercise 1: Say you have a function primitiveMultiply that, in 50 percent of 
cases, multiplies two numbers, and in the other 50 percent, raises an exception
of type MultiplicatorUnitFailure. Write a function that wraps this clunky
function and just keeps trying until a call succeeds, after which it returns the
result.

Make sure you handle only the exceptions you are trying to handle.
*/

// my code
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a,b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a,b) {
  for (;;) {
    try {
      console.log(primitiveMultiply(a,b));
      break;
    }
    catch (error) {
      if (error instanceof MultiplicatorUnitFailure) {
        console.log("Error: " + error);
        return reliableMultiply(a,b);
      }
      else throw error;
    }
  }
}

console.log(reliableMultiply(8,8));

// Eloquent Js Solution
/*
My code works, but this definitely makes much more sense and is much cleaner.
First, the try block returns the reliableMultiply function instead of just
logging it to the console. I thought of this when I was writing my code, but I
was confused because I thought I needed to include the break statement, and I 
knew a return statement would make that code extraneous. Overall, what I did
didn't make sense because it didn't have a return value.

Secondly, the author's solution improves on my catch block by only throwing an
error if it's not an instance of the MultiplierUnitFailure error. This makes a
lot of sense because the catch function will already go back to the try block
since it is nested in a for loop.
*/
function MultiplicatorUnitFailure() {}

function primitiveMultiply(a,b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a,b) {
  for (;;) {
    try {
      return primitiveMultiply(a,b);
    }
    catch (error) {
      if (!(error instanceof MultiplicatorUnitFailure))
        throw error;
    }
  }
}

console.log(reliableMultiply(8,8));

