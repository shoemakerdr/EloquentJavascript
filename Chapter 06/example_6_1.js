// Chapter 6: The Secret Life of Objects

// Examples from the chapter

/*
Example: Laying out a table

I am going to work through a slightly more involved example in an attempt to
give you a better idea what polymorphism, as well as object-oriented programming
in general, looks like. The project is this: we will write a program that, given
an array of arrays of table cells, builds up a string that contains a nicely
laid out table—meaning that the columns are straight and the rows are aligned.
Something like this:

name         height country
------------ ------ -------------
Kilimanjaro    5895 Tanzania
Everest        8848 Nepal
Mount Fuji     3776 Japan
Mont Blanc     4808 Italy/France
Vaalserberg     323 Netherlands
Denali         6168 United States
Popocatepetl   5465 Mexico

The way our table-building system will work is that the builder function will
ask each cell how wide and high it wants to be and then use this information to
determine the width of the columns and the height of the rows. The builder
function will then ask the cells to draw themselves at the correct size and 
assemble the results into a single string.

The layout program will communicate with the cell objects through a well-defined
interface. That way, the types of cells that the program supports is not fixed
in advance. We can add new cell styles later—for example, underlined cells for
table headers—and if they support our interface, they will just work, without
requiring changes to the layout program.

This is the interface:

  minHeight() returns a number indicating the minimum height this cell requires
    (in lines).

  minWidth() returns a number indicating this cell’s minimum width (in
    characters).

  draw(width, height) returns an array of length height, which contains a series
    of strings that are each width characters wide. This represents the content
    of the cell.
*/
// Calculates height of each row
function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

// Calculates column widths by mapping first array in data set
function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

//Draws the table
function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  //Draws an individual row
  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  // Draws all rows
  function drawRow(row, rowNum) {
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  // This joins all rows together with newline characters
  return rows.map(drawRow).join("\n");
}

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


// 5x5 checkerboard
/*
var rows = [];
for (var i = 0; i < 5; i++) {
   var row = [];
   for (var j = 0; j < 5; j++) {
     if ((j + i) % 2 == 0)
       row.push(new TextCell("##"));
     else
       row.push(new TextCell("  "));
   }
   rows.push(row);
}
console.log(drawTable(rows));
*/

// Constructor to create cell with underline
function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([repeat("-", width)]);
};

/*
// Takes data set as argument and converts it to cell format
function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      return new TextCell(String(row[name]));
    });
  });
  return [headers].concat(body);
}
*/

// creates right-aligned text cell for numbers columns
function RTextCell(text) {
  TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  }
  return result;
};

// takes data set as argument and draws table with numbers column right aligned
function dataTable(data) {
  var keys = Object.keys(data[0]);
  var headers = keys.map(function(name) {
    return new UnderlinedCell(new TextCell(name));
  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      var value = row[name];
      // This was changed:
      if (typeof value == "number")
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    });
  });
  return [headers].concat(body);
}

// data set
var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

console.log(drawTable(dataTable(MOUNTAINS)));