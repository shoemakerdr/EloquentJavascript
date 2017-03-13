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

// my code
function SmartPlantEater() {
  this.energy = 30;
  this.dir = "e";
}

SmartPlantEater.prototype.act = function() {
  var space = view.find(" ");
  if (this.energy > 90 && space)
    return {type: "reproduce", direction: space};
  var plants = view.findAll("*");
  if (plants.length > 1)
    return {type: "eat", direction: randomElement(plants)};
  if (view.look(this.direction) != " " && space)
    this.direction = space;
  return {type: "move", direction: this.direction};
};