import Ember     from 'ember';
import Computer  from '../objects/better-computer';
import Scoreable from '../mixins/scoreable';

export default Ember.Service.extend(Scoreable, {
  name: 'gameState',

  lexicalBoard: {
    top:    { left: [0, 0], middle: [0, 1], right: [0, 2] },
    center: { left: [1, 0], middle: [1, 1], right: [1, 2] },
    bottom: { left: [2, 0], middle: [2, 1], right: [2, 2] }
  },

  board: [
    ['.top.left',    '.top.middle',    '.top.right'   ],
    ['.center.left', '.center.middle', '.center.right'],
    ['.bottom.left', '.bottom.middle', '.bottom.right']
  ],

  lastTurn: { player: null, position: null },

  init(){
    this.set('computer', Computer.create());
  },

  isSpaceTaken(position){
    let tile = this.get('lexicalBoard' + position);
    return tile === 'user' || tile === 'computer';
  },

  isComputersTurn(){
    return this.get('lastTurn.player') === 'player';
  },

  userTurn(position){
    let space = this.get('lexicalBoard' + position);
    this.set('lexicalBoard' + position, 'user');
    this.set('lastTurn', {player: 'user', position: position});
    this.get('board')[space[0]][space[1]] = 'user';
    this.computerTurn();
  },

  computerTurn(){
    let space = this.get('computer').takeTurn(this.get('board'));
    let position = this.board[space[0]][space[1]];
    this.board[space[0]][space[1]] = 'computer';
    this.set('lexicalBoard' + position, 'computer');
    this.set('lastTurn', {player: 'computer', position: position});
  }

});
