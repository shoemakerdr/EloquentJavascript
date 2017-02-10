//Chapter 6

/*
Exercise 3: Sequence interface

Design an interface that abstracts iteration over a collection of values. An
object that provides this interface represents a sequence, and the interface
must somehow make it possible for code that uses such an object to iterate over
the sequence, looking at the element values it is made up of and having some way
to find out when the end of the sequence is reached.

When you have specified your interface, try to write a function logFive that
takes a sequence object and calls console.log on its first five elements—or
fewer, if the sequence has fewer than five elements.

Then implement an object type ArraySeq that wraps an array and allows iteration
over the array using the interface you designed. Implement another object type
RangeSeq that iterates over a range of integers (taking from and to arguments to
its constructor) instead.
*/

// I have to admit: this one totally stumped me. Had to look at solutions to 
// understand it. Trying not to feel like an idiot for not understanding this.
// Will comment a full explanation of the code.

// Takes a sequence object as an argument, log current state of sequence, checks
// boolean value of function next()
function logFive(sequence) {
  for (var i = 0; i < 5; i++){
    if (!sequence.next())
      break;
    console.log(sequence.current());
  }
}

// Constructor for a sequence of arrays
function ArraySeq(array) {
  this.position = -1;
  this.array = array;
}

// Checks if position in index is greater than length of array. Starts at -1 in
// case array is empty.
ArraySeq.prototype.next = function() {
  if (this.position >= this.array.length - 1) 
    return false;
  this.position++;
  return true;
};

// Returns current element in array
ArraySeq.prototype.current = function() {
  return this.array[this.position];
};

// Constructor that creates sequence object for a range of numbers. Gives a now
// state (which is set at one less than start)
function RangeSeq(start, end) {
  this.now = start - 1;
  this.end = end;
}

// Returns false if now state is at end state. Else adds 1 to now state then 
// returns true.
RangeSeq.prototype.next = function() {
  if (this.now >= this.end)
    return false;
  this.now++;
  return true;
};

// Returns current now state
RangeSeq.prototype.current = function() {
  return this.now;
};

logFive(new ArraySeq([1, 2]));
logFive(new RangeSeq(100, 1000));