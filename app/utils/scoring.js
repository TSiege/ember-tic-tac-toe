export const USER = 'user';
export const COMPUTER = 'computer';
const lineScores = {3: 0, 2: 10, 1: 100};

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

export function scoreGame(board, player){
  let scores = getLines(board).map(scoreLine);
  if (player === COMPUTER) {
    return _.max(scores);
  } else {
    return _.min(scores);
  }
}

// if line has no players tiles its value is zero
// if line has at least one tile for each player value is zero
// if line has two same tiles and one empty values is 10
// if line has three of the same kind is 100
function scoreLine(line){
  if ( line.includes(COMPUTER) && line.includes(USER) ) { return 0; }
  let multiplier = line.includes(COMPUTER) ? 1 : -1;
  let length = _.uniq(line).length;
//if(lineScores[length] === 10 ) {console.log(line)}
  return lineScores[length] * multiplier;
}

function getLines(board){
  return _.concat(board, getColumns(board), getDiagonals(board));
}

function getDiagonals(board){
  let diag1 = [board[0][0], board[1][1], board[2][2]];
  let diag2 = [board[2][0], board[1][1], board[0][2]];
  return [diag1, diag2];
}

function getColumns(board){
  let col1 = [board[0][0], board[1][0], board[2][0]];
  let col2 = [board[0][1], board[1][1], board[2][1]];
  let col3 = [board[0][2], board[1][2], board[2][2]];
  return [col1, col2, col3];
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
