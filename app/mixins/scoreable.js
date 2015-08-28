import Ember from 'ember';

export default Ember.Mixin.create({
  hasWon(){
    return this.isDiagonalWinner()
      || this.isHorizontalWinner()
      || this.isVerticalWinner();
  },
  isDiagonalWinner(){
    var middle = this.board[1][1],
        diag1 = this.board[0][0] === middle && middle === this.board[2][2],
        diag2 = this.board[0][2] === middle && middle === this.board[2][0];
    return diag1 || diag2;
  },
  isHorizontalWinner(){
    var row = 0,
        middle;

    while( row < 3 ) {
      middle = this.board[row][1]
      if( this.board[row][0] === middle && middle === this.board[row][2] ){
        return true;
      }
      row++;
    }
    return false;
  },
  isVerticalWinner(){
    var column = 0,
        middle;

    while( column < 3 ) {
      middle = this.board[1][column]
      if( this.board[0][column] == middle && middle == this.board[2][column] ) {
        return true;
      }
      column++;
    }
    return false;
  }
});