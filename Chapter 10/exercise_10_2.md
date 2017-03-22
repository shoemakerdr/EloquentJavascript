*Chapter 10: Modules*

***Exercise 2: A return to electronic life***

Hoping that Chapter 7 is still somewhat fresh in your mind, think back to the 
system designed in that chapter and come up with a way to separate the code into
modules. To refresh your memory, these are the functions and types defined in
that chapter, in order of appearance:

- Vector
- Grid
- directions
- directionNames
- randomElement
- BouncingCritter
- elementFromChar
- World
- charFromElement
- Wall
- View
- WallFollower
- dirPlus
- LifelikeWorld
- Plant
- PlantEater
- SmartPlantEater
- Tiger

Don’t exaggerate and create too many modules. A book that starts a new chapter
for every page would probably get on your nerves, if only because of all the
space wasted on titles. Similarly, having to open 10 files to read a tiny
project isn’t helpful. Aim for three to five modules.

You can choose to have some functions become internal to their module and thus
inaccessible to other modules.

There is no single correct solution here. Module organization is largely a
matter of taste.

**Solution**
Module "grid"
  Vector
  Grid
  directions
  directionNames

Module "world"
  (randomElement)
  (elementFromChar)
  (charFromElement)
  View
  World
  LifelikeWorld
  directions [reexported]

Module "simple_ecosystem"
  (randomElement) [duplicated]
  (dirPlus)
  Wall
  BouncingCritter
  WallFollower

Module "ecosystem"
  Wall [duplicated]
  Plant
  PlantEater
  SmartPlantEater
  Tiger