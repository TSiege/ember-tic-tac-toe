import { isGameOver, getFreeSpaces, scoreGame, USER, COMPUTER } from '../utils/scoring';
import Ember from 'ember';

export default Ember.Object.extend({
  takeTurn(board){
    let { move } = minimax(board, COMPUTER);
    return move;
  }
});

function minimax(board, player, depth=0) {
  //if middle tile isn't taken take it
  if (!_.includes([COMPUTER, USER], board[1][1])) { return {move: [[1],[1]]}; }
  //create an empty array of possible moves
  let moves = [];
  //retrieve free spaces
  let freeSpaces = getFreeSpaces(board);
  //if there are no freeSpaces return null for move
  if (!freeSpaces.length) { return {move: null}; }
  //set adversary for recursive calls
  let adversary = player === COMPUTER ? USER : COMPUTER;

  //increment depth
  depth++;

  //iterate through potential moves
  for (let spaceIndex = 0; freeSpaces.length > spaceIndex; spaceIndex++) {
    let score;
    //select a move to try
    let move = freeSpaces[spaceIndex];
    //store original tile to reset board
    let originalTile = board[move[0]][move[1]];
    //take selected move
    takeSpace(board, move, player);

    if (isGameOver(board)) {
      //if game is over score move
      score = scoreGame(board, player, depth);
    } else {
      //if game is not over keep going...
      score = minimax(board, adversary, depth).score;
    }

    //push move and final score into array of possible moves
    moves.push({score, move});
    //replace original tile on the board
    takeSpace(board, move, originalTile);
  }

  if (player === COMPUTER && moves.length > 0) {
    //if player is computer the best move it can make
    return _.maxBy(moves, (obj) => { return obj.score; });
  } else {
    //if player is human the best move it can make
    //AKA the worst move for the computer
    return _.minBy(moves, (obj) => { return obj.score; });
  }
}

function takeSpace(board, space, tile) {
  board[space[0]][space[1]] = tile;
  return board;
}
