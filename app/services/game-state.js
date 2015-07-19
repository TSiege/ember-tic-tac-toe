import Ember    from 'ember';
import Computer from '../objects/computer'

export default Ember.Service.extend({
  name: 'gameState',

  init: function(){
    this.set('computer', Computer.create());
  },

  isSpaceTaken: function(position){
    var tile = this.get('_lexicalGrid' + position);

    return tile === 'user' || tile === 'computer';
  },

  _lexicalGrid: {
    top:    { left: [0, 0], middle: [0, 1], right: [0, 2] },
    center: { left: [1, 0], middle: [1, 1], right: [1, 2] },
    bottom: { left: [2, 0], middle: [2, 1], right: [2, 2] }
  },

  _numericGrid: [
    ['.top.left',    '.top.middle',    '.top.right'   ],
    ['.center.left', '.center.middle', '.center.right'],
    ['.bottom.left', '.bottom.middle', '.bottom.right']
  ],

  lastTurn: { player: null, position: [null] }, 

  userTurn: function(position){
    var space = this.get('_lexicalGrid' + position);
    this.set('_lexicalGrid' + position, 'user');

    this.get('computer').takeTurn(this.get('_numericGrid'));
  }


});
