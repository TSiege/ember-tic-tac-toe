export const USER = 'user';
export const COMPUTER = 'computer';

export function hasWon(board){
  return isDiagonalWinner(board) ||
    isHorizontalWinner(board) ||
    isVerticalWinner(board);
}

export function hasTied(board) {
  if ( !hasWon(board) ) { return !getFreeSpaces(board).length; }
  return false;
}

function isDiagonalWinner(board){
  let middle = board[1][1];
  let diag1 = board[0][0] === middle && middle === board[2][2];
  let diag2 = board[0][2] === middle && middle === board[2][0];
  return diag1 || diag2;
}

function isHorizontalWinner(board){
  let row = 0;
  let middle;

  while( row < 3 ) {
    middle = board[row][1];
    if( board[row][0] === middle && middle === board[row][2] ){
      return true;
    }
    row++;
  }
  return false;
}

function isVerticalWinner(board){
  let column = 0;
  let middle;

  while( column < 3 ) {
    middle = board[1][column];
    if( board[0][column] === middle && middle === board[2][column] ) {
      return true;
    }
    column++;
  }
  return false;
}

export function getFreeSpaces(board){
  let row;
  let space;
  let spaces = [];
  for (let rowIndex = 0; board.length > rowIndex; rowIndex++) {
    row = board[rowIndex];
    for (let colIndex = 0; row.length > colIndex; colIndex++) {
      space = row[colIndex];
      if (space !== USER && space !== COMPUTER) {
        spaces.push([rowIndex, colIndex]);
      }
    }
  }

  return spaces;
}

export function isGameOver(board){
  return hasWon(board) || !getFreeSpaces(board).length;
}

export function scoreGame(board, player, depth){
  let score = hasWon(board) ? 10 : 0;
  let multiplier = player === COMPUTER ? 1 : -1;
  return (score - depth) * multiplier;
}
