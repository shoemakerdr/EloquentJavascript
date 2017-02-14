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