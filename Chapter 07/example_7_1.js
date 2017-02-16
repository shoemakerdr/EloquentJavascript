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
// Gives BouncingCritter an act method, which 
BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction}; 
};
