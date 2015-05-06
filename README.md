#Ember tic-tac-toe

##Structure:

###Player (Object)
  - base class that has methods like take turn

###Computer (Object)
  - inherits from player
  - handles logic for making best move

###User (Object)
  - inherits from player
  - handles logic for taking user input

###Game State (Object)
  - manages the game’s state
  - knows who has one/who’s turn it is

###Board (Component)
  - displays game state
  - the interface the user interacts with
  - notifies the game state of user's inputs