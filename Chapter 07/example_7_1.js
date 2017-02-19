// Chapter 7: Electronic Life

/*
Plan for grid representing how the world will look. "#" will represent
walls/rock; "o" will represent "critters". This will be used to create a world
object, which will have a "toString" method (converting it to a printable
string) and a "turn" method (which updates the world object to reflect the
critters actions)
*/
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

// Vector object identifies squares in grid. The plus method is used for moving
// the critters
function Vector(x,y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y)
};

// Grid object (which will be a property of the World object) models the grid.
// The grid values will be stored in a single array. We find the position (x,y)
// with x + (y * width).

function Grid(width, height) {
  // Used Array constructor to create a new array the length of the grid
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
// Method that returns boolean of whether given coordinate is within Grid
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};
// Method for getting value (character) in a given coordinate
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};
// Method for setting value (character) in a given coordinate
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};
// Directions object for mapping direction names to coordinate changes
  //NOTE: Directions in book had north and south mixed up
var directions = {
  "s": new Vector(0, -1),
  "se": new Vector(1, -1),
  "e": new Vector(1, 0),
  "ne": new Vector(1, 1),
  "n": new Vector(0, 1),
  "nw": new Vector(-1, 1),
  "w": new Vector(-1, 0),
  "sw": new Vector(-1, -1),
};
// function to choose a random element from a given array
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// An array of the names of the directions
var directionNames = "s se e ne n nw w sw".split(" ");
//Constructor for critter object
function BouncingCritter() {
  this.direction = randomElement(directionNames);
};
// Gives BouncingCritter an act method, which takes a view object as argument
// which has a "look" method to which takes a direction and return a character.
// If the character is a blank space, act returns an object with the type "move"
// and a direction for the critter to move. If view doesn't find a blank space,
// It uses the find method of the view object to find one. If it doesn't find a
// blank space, it return null. To prevent this.direction from getting the value
// null, || "s" is used.
BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};
// Function that takes legend and a character as arguments. It checks the
// character against the legend and returns the constructor for the character.
// If a blank space, it returns null.
function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}
// World constructor takes a map in the form of an array of strings (in our
// case, it is the var plan earlier) and a legend as arguments. It creates a
// grid from the map and hold it and the legend as properties.
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;
// Sets the grid-- gives every character a vector coordinate to reference
  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
  });
}
// Function that takes an element (a character object) as an argument and returns the
// character symbol.
function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}
// Modified toString method for World object that prints the world as a string
// using the originChar values.
World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output+= charFromElement(element);
    }
    output += "\n";
  }
  return output;
};
// Wall constructor for wall object. Has no act method. Only for taking up
// space.
function Wall() {}
// Printing a new world object out as a string
var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});
console.log(world.toString());
