import Ember from 'ember';

export default Ember.Component.extend({
  rows: ['top', 'center', 'bottom'],
  columns: ['left', 'middle', 'right'],
  gameState: Ember.inject.service('gameState'),
  userMarker: 'fa-times',
  computerMarker: 'fa-circle',

  init() {
    this.tileResizer();

    this._super(...arguments);
  },

  updateBoard: Ember.observer('gameState.lastTurn', function(){
    let player   = this.get('gameState.lastTurn.player');
    let position = this.get('gameState.lastTurn.position');
    this._markPosition(position, player);
  }),

  willDestroy() {
    Ember.$(window).unbind('resize', this.resizeTiles);
    Ember.$(window).unbind('resize', this.repositionMarkers);
    this._super();
  },

  tileResizer(){
    let resizeTiles = function(){
      let $tiles = Ember.$('.tile');
      let width  = $tiles.first().width();

      $tiles.css({height: width});
    };

    this.resizeTiles = resizeTiles;
    Ember.$(window).bind('resize', this.get('resizeTiles'));
    setTimeout(resizeTiles, 1);
  },

  actions: {
    takeTurn(row, column){
      let position = `.${row}.${column}`;

      if( this.get('gameState').isSpaceTaken(position) ){
        return;
      } else {
        this.get('gameState').userTurn(position);
      }
    }
  },
  // private methods
  _markPosition(position, player){
    let playerMarker = this.get(`${player}Marker`);
    let marker = player === 'user' ? 'x' : 'o';
    Ember.$(position + ' .fa').text(marker);
  }
});
