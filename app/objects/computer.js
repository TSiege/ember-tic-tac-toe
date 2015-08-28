import Player from './player';

export default Player.extend({
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
      if( this._hasWon() ) {
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
  },
  _hasWon(){
    return this._isDiagonalWinner()
      || this._isHorizontalWinner()
      || this._isVerticalWinner();
  },
  _isDiagonalWinner(){
    var middle = this.board[1][1],
        diag1 = this.board[0][0] === middle && middle === this.board[2][2],
        diag2 = this.board[0][2] === middle && middle === this.board[2][0];
    return diag1 || diag2;
  },
  _isHorizontalWinner(){
    var row = 0,
        middle;

    while( row < 3 ) {
      middle = this.board[row][1]
      if( this.board[row][0] === middle && middle === this.board[row][2] ){
        return true;
      }
      row += 1;
    }
    return false;
  },
  _isVerticalWinner(){
    var column = 0,
        middle;

    while( column < 3 ) {
      middle = this.board[1][column]
      if( this.board[0][column] == middle && middle == this.board[2][column] ) {
        return true;
      }
      column += 1;
    }
    return false;
  }
});
