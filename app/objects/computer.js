import Ember     from 'ember';
import Scoreable from '../mixins/scoreable';

export default Ember.Object.extend(Scoreable, {
  takeTurn(board){
    this.board = board;
    return this._minimax(1)[1];
  },
  // private methods
  _getFreeSpaces(){
    var row;
    var space;
    var spaces = [];
    var board  = this.board;
    for (var rowIndex = 0; board.length > rowIndex ; rowIndex++) {
      row = board[rowIndex]
      for (var colIndex = 0; row.length > colIndex; colIndex++) {
        space = row[colIndex]
        if (space !== 'user' && space !== 'computer') {
          spaces.push([rowIndex, colIndex]);
        }
      }
    };

    return spaces;
  },
  _minimax(number){
    var player;
    var winner;
    var freeSpace;
    var originalTile;

    var board       = this.board;
    var freeSpaces  = this._getFreeSpaces()
    var moveWinners = [];
    var startTime = Date.now();
    for (var spaceIndex = 0; freeSpaces.length > spaceIndex; spaceIndex++) {
      freeSpace = freeSpaces[spaceIndex];
      // we determine if the move being made is the computers or the users
      // 1 represents the computer
      // -1 represents the user
      player = number === -1 ? 'user' : 'computer';
      // we assign the original piece 
      // so we can reset the board when we're done
      originalTile = board[freeSpace[0]][freeSpace[1]];
      // we now try a tile
      board[freeSpace[0]][freeSpace[1]] = player;
      // we determine the value of tile we took
      if( this.hasWon() ) {
        // this move resulted in a player winning
        winner = number;
      } else if ( this._getFreeSpaces().length === 0 ) {
        // this game has tied
        winner = 0;
      } else {
        // keep going since no one has won
        winner = this._minimax(-number)[0];
      }

      // we push that value into coordinate into the array of tiles
      moveWinners.push( [winner, [freeSpace[0], freeSpace[1]]] );
      // we reset the board
      board[freeSpace[0]][freeSpace[1]] = originalTile;
    };

    // if the number (the player) is the user and we found a winning move...
    if( number === 1 && moveWinners.length > 0 ){
      // return the best move...
      return _.max(moveWinners, function(arr){ return arr[0]; });
    } else {
      // return the worst move...
      return _.min(moveWinners, function(arr){ return arr[0]; });
    }
  }
});
