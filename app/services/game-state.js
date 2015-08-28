import Ember    from 'ember';
import Computer from '../objects/computer'

export default Ember.Service.extend({
  name: 'gameState',

  _lexicalGrid: {
    top:    { left: [0, 0], middle: [0, 1], right: [0, 2] },
    center: { left: [1, 0], middle: [1, 1], right: [1, 2] },
    bottom: { left: [2, 0], middle: [2, 1], right: [2, 2] }
  },

  _numericalGrid: [
    ['.top.left',    '.top.middle',    '.top.right'   ],
    ['.center.left', '.center.middle', '.center.right'],
    ['.bottom.left', '.bottom.middle', '.bottom.right']
  ],

  lastTurn: { player: null, position: null }, 

  init(){
    this.set('computer', Computer.create());
  },

  isSpaceTaken(position){
    var tile = this.get('_lexicalGrid' + position);
    return tile === 'user' || tile === 'computer';
  },

  isComputersTurn(){
    return this.get('lastTurn.player') === 'player';
  },

  userTurn(position){
    var space = this.get('_lexicalGrid' + position);
    this.set('_lexicalGrid' + position, 'user');
    this.set('lastTurn', {player: 'user', position: position});
    this.get('_numericalGrid')[space[0]][space[1]] = 'user';
    this.computerTurn();
  },

  computerTurn(){
    var space = this.get('computer').takeTurn(this.get('_numericalGrid'));
    var position = this._numericalGrid[space[0]][space[1]];
    this._numericalGrid[space[0]][space[1]] = 'computer';
    this.set('_lexicalGrid' + position, 'computer');
    this.set('lastTurn', {player: 'computer', position: position});
  }

});
