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
// Adds one vector coordinate to another and returns that as a new vector.
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
// Method for getting value (character) in a given coordinate. Returns the
// character of a given vector coordinate.
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
  "n": new Vector(0, 1),
  "ne": new Vector(1, 1),
  "e": new Vector(1, 0),
  "se": new Vector(1, -1),
  "s": new Vector(0, -1),
  "sw": new Vector(-1, -1),
  "w": new Vector(-1, 0),
  "nw": new Vector(-1, 1),
};
// Function returns a random element from a given array.
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
// Function that takes an element (a character object) as an argument and
// returns the character symbol.
function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}
// Modified toString method for World object that returns the world as a string
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
// Defining a new forEach method for Grid objects. It uses the call method to
// bind a specific "this" context to a particular function, which will mostly be
// types of critters
Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};
// Turn method for the world object that takes the grid, searches for objects
// that have an act method and when found, calls the method to get an action
// object, then carries out the action when it is valid, and puts them in the
// "acted" array. If they are already in the acted array, they will do nothing.
World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter,vector);
    }
  }, this);
};
// letAct method allows critters to move. It assigns an action from the
// critter's act method (which takes a new View object as it's argument), checks
// that the action is "move," checks that the the destination is in the grid and
// is an empty space, then sets the old vector as null and the destination as
// the critter.
World.prototype.letAct = function (critter, vector) {
  var action = critter.act(new View(this, vector));
  if (action && action.type == "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};
// Method of World object that checks if the destination vector is a real
// direction. If so, it checks if the destination is in the grid. If so, it
// returns the destination.
World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};
// View object is used to check if a particular vector has access to another
// vector for action purposes.
function View(world, vector) {
  this.world = world;
  this.vector = vector;
}
// Look method assigns a target vector in a chosen direction, checks if it is
// inside the grid,, then returns the character that is in the target. If it is
// not in the grid, the Wall character is returned.
View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};
// findAll method returns all directions with a given character. In our case,
// we're looking for " " characters. Returns all instances of a character in all
// 8 directions as an array.
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) === ch)
      found.push(dir);
  return found;
};
// find method returns a random direction from the found array made with the
// findAll method.
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length === 0) return null;
  return randomElement(found);
};
// Performs the turn method 5 times and logs the world as a string to the
// console.
for(var i = 0; i < 5; i++) {
  world.turn();
  console.log(world.toString());
}
// dirPlus function makes direction changes calculable by adding the direction
// change and the number of elements in the directions array to the index number
// and then getting the modulus value. Positive n goes clockwise, negative n
// goes counter-clockwise.
function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}
// WallFollower object's default starting direction is south.
function WallFollower() {
  this.dir = "s";
}
/*
The act method of this critter first assigns the WallFollower's default
direction to the start variable. It uses the look method on the View object
to check if the vector to just behind the critter's left (3 vectors
counter-clockwise from the starting position) is open. If not, both the start
value and default direction of the object are changed to the critter's left
(2 vectors counter-clockwise from the original default direction). This is so
the critter is always checking its left side first to make sure it is always
following along the wall.
*/
WallFollower.prototype.act = function(view) {
  var start = this.dir;
  if (view.look(dirPlus(this.dir, -3)) != " ")
    start = this.dir = dirPlus(this.dir, -2);
  while (view.look(this.dir) != " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) break;
  }
  return {type: "move", direction: this.dir};
};
// New constructor for LifelikeWorld that it created by using the call method 
// for the previously used World constructor.
function LifelikeWorld(map, legend) {
  World.call(this. map, legend);
}
// Assigns the prototype of the World object to the LifelikeWorld prototype
// using the create method.
LifelikeWorld.prototype = Object.create(World.prototype);
// Creates an empty Object that will be used to hold the types of actions we
// will be using as its properties
var actionTypes = Object.create(null);
/*
Defining a new letAct method for the LifelikeWorld object-- which overrides the
letAct method it inherited from being created from World prototype. This method
first assigns the critter's act method to the variable "action." It then assigns
boolean values (if the critter took an action, if the action type is in the
actionTypes object, and if there was a successful call to the type in 
actionTypes) and a function (a type of action from actionTypes) with the call
method to the variable "handled." If the handled variable returns false, meaning
that the critter did not take an action, it takes 0.2 energy away from the
critter. And if the critter's energy is less than/equal to 0, the vector that 
the critter occupies is set to null (i.e. the critter is dead).
*/
LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action &&
                action.type in actionTypes &&
                actionTypes[action.type].call(this, critter, vector, action);
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0)
      this.grid.set(vector, null);
  }
};
// grow method adds 0.5 energy to the critter and returns true (used for handled
// check in letAct prototype)
actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};
/*
The move method uses checkDestination method (which get the LifelikeWorld's
"this" value because the call method was used in its letAct method) to return 
the destination vector. If null is return, the critter has less than 1 energy or
the destination is not empty, it returns false. Else it subtracts 1 energy from
the critter, sets its current vector to null, sets its destination vector to the
critter, and returns true.
*/
actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 1 ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};
/*
The eat method uses checkDestination method (like in move method) to return the
destination vector. Then assigns boolean of dest and the boolean/get value of 
the grid object (with dest as its arg). If atDest returns false or there is no
energy at the destination, it returns false. Else it adds the destination's 
energy to the critter and sets the destination to null.
*/
actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};
/*
The reproduce method first assigns a new critter to the variable "baby" by
calling the elementFromChat method of the LifelikeWorld object. Then it uses the
checkDestination method to assign the destination vector to a variable "dest."
If dest returns null, the critter's energy is less than double the baby's 
energy, or the destination is not a blank space, it returns false. Else, it
subtracts two times the baby's energy, sets the destination vector to the baby,
and returns true.
*/
actionTypes.reproduce = function(critter, vector, action) {
  var baby = elementFromChar(this.legend, critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};
// Plant constructor function initializes the plant object's energy to between 3
// and 7.
function Plant() {
  this.energy = 3 + Math.random() * 4;
}
/*
Add act method to plant object prototype. If the plant's energy is more than 15,
it uses the find method of the view object to find a blank space. If it finds
/space, it returns an object with with a "reproduce" type and the vector
coordinates of the blank space. If its energy is less than 20, it returns an
object with a "grow" type.
*/
Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};
// PlantEater constructor function initializes the PlantEater object's energy at
// 20.
function PlantEater() {
  this.energy = 20;
}
/* 
Gives an act method to the PlantEater object prototype. First it uses the find
method of the view object to find a blank space and assigns it to the variable
"space." If the PlantEater's energy is greater than 60 and the destination space
is blank, it returns the "reproduce" object. If not, it searches for plants, and
if it finds a plant, it returns the "eat" object. Else, if there is an empty
space, it returns the "move" object.
*/
PlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
};
