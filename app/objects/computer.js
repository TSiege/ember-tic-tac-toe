import Player from './player';

export default Player.extend({
  takeTurn: function(board){
    this.set('board', board);
    return this._minimax(1);
  },
  // private methods
  _getFreeSpaces: function(){
    var spaces = [];
    this.get('board').forEach(function(row, rowIndex){
      row.forEach(function( space, columnIndex ){
        if (space !== 'O' && space !== 'X') {
          spaces.push([rowIndex, columnIndex]);
        }
      });
    });
    return spaces;
  },
  _minimax: function(number){
    var moveWinners = [];
    var player;
    var originalPiece;
    var winner;
    var self = this;
    
    this._getFreeSpaces().forEach(function(row, rowIndex){
      // we determine if the move being made is the computers or the users
      // -1 represents the computer
      // 1 represents the user
      player = number === -1 ? 'X' : 'O';
      // we assign the original piece 
      // so we can reset the board when we're done
      originalPiece = self.board[row[0]][row[1]];
      // we now try a tile
      self.board[row[0]][row[1]] = player;

      // we determine the value of tile we took
      if( self._hasWon() ) {
        winner = number;
      } else if ( self._getFreeSpaces().length === 0 ) {
        winner = 0;
      } else {
        winner = self._minimax(-number)[0];
      }

      // we push that value into coordinate into the array of tiles
      moveWinners.push( [winner, [row[0], row[1]]] );
      // we reset the board
      self.board[row[0]][row[1]] = originalPiece;
    });

    // if the number (the player) is the user and we found a winning move...
    if( number === 1 && moveWinners.length > 0 ){
      // return the best move...
      return _.max(moveWinners, function(arr){ return arr[0]; });
    } else {
      // return the worst move...
      return _.min(moveWinners, function(arr){ return arr[0]; });
    }
  },
  _hasWon: function(){
    return this._isDiagonalWinner()
      || this._isHorizontalWinner()
      || this._isVerticalWinner();
  },
  _isDiagonalWinner: function(){
    var middle = this.get('board')[1][1],
        diag1 = this.get('board')[0][0] === middle && middle === this.get('board')[2][2],
        diag2 = this.get('board')[0][2] === middle && middle === this.get('board')[2][0];
    return diag1 || diag2;
  },
  _isHorizontalWinner: function(){
    var row = 0,
        middle;

    while( row < 3 ) {
      middle = this.get('board')[row][1]
      if( this.get('board')[row][0] === middle && middle === this.get('board')[row][2] ){
        return true;
      }
      row += 1;
    }
    return false;
  },
  _isVerticalWinner: function(){
    var column = 0,
        middle;

    while( column < 3 ) {
      middle = this.get('board')[1][column]
      if( this.get('board')[0][column] == middle && middle == this.get('board')[2][column] ) {
        return true;
      }
      column += 1;
    }
    return false;
  }
});
