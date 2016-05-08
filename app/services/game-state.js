import Ember     from 'ember';
import Computer  from '../objects/computer';
import { USER, COMPUTER, hasWon, hasTied } from '../utils/scoring';

const LEXICAL_BOARD = {
  top:    { left: [0, 0], middle: [0, 1], right: [0, 2] },
  center: { left: [1, 0], middle: [1, 1], right: [1, 2] },
  bottom: { left: [2, 0], middle: [2, 1], right: [2, 2] }
};

const BOARD = [
  ['.top.left',    '.top.middle',    '.top.right'   ],
  ['.center.left', '.center.middle', '.center.right'],
  ['.bottom.left', '.bottom.middle', '.bottom.right']
];

const LAST_TURN = { player: null, position: null };

export default Ember.Service.extend({
  name: 'gameState',

  init(){
    this.reset();
    this.set('computer', Computer.create());
  },

  isSpaceTaken(position){
    let tile = this.get(`lexicalBoard${position}`);
    return tile === USER || tile === COMPUTER;
  },

  userCannotTakeTurn(position) {
    return this.hasTied || this.hasComputerWon || this.isSpaceTaken(position);
  },

  userTurn(position){
    if (this.userCannotTakeTurn(position)){ return; }
    let space = this.get(`lexicalBoard${position}`);
    this.set(`lexicalBoard${position}`, USER);
    this.set('lastTurn', { player: USER, position });
    this.get('board')[space[0]][space[1]] = USER;
    this.computerTurn();
    this.updateStates();
  },

  computerTurn(){
    let space = this.get('computer').takeTurn(this.get('board'));
    if (space) {
    let position = this.board[space[0]][space[1]];
      this.board[space[0]][space[1]] = COMPUTER;
      this.set(`lexicalBoard${position}`, COMPUTER);
      this.set('lastTurn', { player: COMPUTER, position });
    }
  },

  updateStates(){
    let board = this.get('board');
    if (hasTied(board)) { this.set('hasTied', true); }
    if (hasWon(board)) { this.set('hasComputerWon', true); }
  },

  reset(){
    let lexicalBoard   = _.cloneDeep(LEXICAL_BOARD);
    let board          = _.cloneDeep(BOARD);
    let lastTurn       = _.clone(LAST_TURN);
    let hasTied        = false;
    let hasComputerWon = false;
    this.setProperties({ lexicalBoard, board, lastTurn, hasTied, hasComputerWon });
  }
});
