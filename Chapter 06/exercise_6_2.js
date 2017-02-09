//Chapter 6

/*
Exercise 2: Another cell

Implement a cell type named StretchCell(inner, width, height) that conforms to
the table cell interface described earlier in the chapter. It should wrap
another cell (like UnderlinedCell does) and ensure that the resulting cell has
at least the given width and height, even if the inner cell would naturally be
smaller.

Tests
var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
console.log(sc.minHeight());
console.log(sc.draw(3, 2));
*/

// Repeats a given string a number of times as a new string
function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

// TextCell is a constructor that splits a string into an array of lines 
function TextCell(text) {
  this.text = text.split("\n");
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};

// MY NEW CODE: Stretches cell to be minimum of given width/height
function addHeight(string, times) {
  var result = [];
  for (var i = 0; i < times; i++)
    result.push(string);
  return result;
}

function StretchCell(inner, width, height) {
  this.inner = inner;
  this.width = width;
  this.height = height;
}


  StretchCell.prototype.minWidth = function() {
    return Math.max(this.inner.minWidth(), this.width);
  };

  StretchCell.prototype.minHeight = function() {
    return Math.max(this.inner.minHeight(), this.height);
  };

StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, 1)
    .concat(addHeight(repeat(" ", width), height - 1));
};
