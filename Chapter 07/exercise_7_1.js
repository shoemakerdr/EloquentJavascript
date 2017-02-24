// Chapter 7: Project: Electronic Life
/*
Exercise 1: Artificial stupidity

Having the inhabitants of our world go extinct after a few minutes is kind of 
depressing. To deal with this, we could try to create a smarter plant eater.

There are several obvious problems with our herbivores. First, they are terribly
greedy, stuffing themselves with every plant they see until they have wiped out
the local plant life. Second, their randomized movement (recall that the
view.find method returns a random direction when multiple directions match)
causes them to stumble around ineffectively and starve if there don’t happen to
be any plants nearby. And finally, they breed very fast, which makes the cycles
between abundance and famine quite intense.

Write a new critter type that tries to address one or more of these points and
substitute it for the old PlantEater type in the valley world. See how it fares.
Tweak it some more if necessary.
*/


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




// my code
function SmartPlantEater() {
    this.energy = 20;
    this.dir = "someDirection";
}

SmartPlantEater.prototype.act = function() {
    
}