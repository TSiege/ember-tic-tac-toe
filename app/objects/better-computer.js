import { hasWon, getFreeSpaces, scoreGame, USER, COMPUTER } from '../utils/scoring';
import Ember      from 'ember';

const MIN_VALUE = -Infinity;
const MAX_VALUE = +Infinity;

export default Ember.Object.extend({
  takeTurn(board){
    let { move } = minimax(board, COMPUTER);
    return move;
  }
});

window.numberOfTries = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};
window.counter = 0;

function minimax(board, player) {
  let moves = [];
  let freeSpaces = getFreeSpaces(board);

  window.counter++;
  for (let spaceIndex = 0; freeSpaces.length > spaceIndex; spaceIndex++) {
    let score;
    let move = freeSpaces[spaceIndex];
    let adversary = player === COMPUTER ? USER : COMPUTER;
    let originalTile = board[move[0]][move[1]];

    takeSpace(board, move, player);

    if (gameOver(board)) {
      score = scoreGame(board, player);
    } else {
      score = minimax(board, adversary).score;
    }
    moves.push({score, move});
    takeSpace(board, move, originalTile);
  }

  if (player === COMPUTER && moves.length > 0) {
    window.numberOfTries[moves.length]++;
    if (moves.length === 8) {console.log(window.moves = moves)}
    return _.maxBy(moves, (obj) => { return obj.score; });
  } else {
    window.numberOfTries[moves.length]++;
    return _.minBy(moves, (obj) => { return obj.score; });
  }
}

function gameOver(board){
  return hasWon(board) || !getFreeSpaces(board).length;
}

function takeSpace(board, space, tile) {
  board[space[0]][space[1]] = tile;
  return board;
}

function logBoard(board) {
  console.log(`${board[0].toString()}\n${board[1].toString()}\n${board[2].toString()}`);
}
