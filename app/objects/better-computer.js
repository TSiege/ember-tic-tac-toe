import { isGameOver, getFreeSpaces, scoreGame, USER, COMPUTER } from '../utils/scoring';
import Ember from 'ember';

export default Ember.Object.extend({
  takeTurn(board){
    let { move } = minimax(board, COMPUTER);
    return move;
  }
});

function minimax(board, player, depth=0) {
  if (!_.includes([COMPUTER, USER], board[1][1])) { return {move: [[1],[1]]}; }
  let moves = [];
  let freeSpaces = getFreeSpaces(board);
  let adversary = player === COMPUTER ? USER : COMPUTER;

  depth++;

  for (let spaceIndex = 0; freeSpaces.length > spaceIndex; spaceIndex++) {
    let score;
    let move = freeSpaces[spaceIndex];
    let originalTile = board[move[0]][move[1]];

    takeSpace(board, move, player);

    if (isGameOver(board)) {
      score = scoreGame(board, player, depth);
    } else {
      score = minimax(board, adversary, depth).score;
    }

    moves.push({score, move});
    takeSpace(board, move, originalTile);
  }

  if (player === COMPUTER && moves.length > 0) {
    return _.maxBy(moves, (obj) => { return obj.score; });
  } else {
    return _.minBy(moves, (obj) => { return obj.score; });
  }
}

function takeSpace(board, space, tile) {
  board[space[0]][space[1]] = tile;
  return board;
}
