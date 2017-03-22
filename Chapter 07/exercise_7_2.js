// Chapter 7: Project: Electronic Life
/*
Exercise 2: Predators

Any serious ecosystem has a food chain longer than a single link. Write another
critter that survives by eating the herbivore critter. You’ll notice that
stability is even harder to achieve now that there are cycles at multiple
levels. Try to find a strategy to make the ecosystem run smoothly for at least a
little while.

One thing that will help is to make the world bigger. This way, local population
booms or busts are less likely to wipe out a species entirely, and there is
space for the relatively large prey population needed to sustain a small
predator population.
*/

function Tiger() {
  this.energy = 30;
  this.direction = "s";
}

Tiger.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 180 && space)
    return {type: "reproduce", direction: space};
  var prey = view.find("O");
  if (prey)
    return {type: "eat", direction: randomElement(prey)};
  if (view.look(this.direction) != " " && space)
    this.direction = space;
  return {type: "move", direction: this.direction};
};