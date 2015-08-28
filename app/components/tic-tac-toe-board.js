import Ember from 'ember';

export default Ember.Component.extend({
  rows: ['top', 'center', 'bottom'],
  columns: ['left', 'middle', 'right'],
  gameState: Ember.inject.service('gameState'),
  userMarker: 'fa-times',
  computerMarker: 'fa-circle',

  init() {
    this.tileResizer();
    this.markerResizer();

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
    var resizeTiles = function(){
      let $tiles = Ember.$('.tile');
      let width  = $tiles.first().width();

      $tiles.css({height: width});
    };

    this.resizeTiles = resizeTiles;
    Ember.$(window).bind('resize', this.get('resizeTiles'));
    setTimeout(resizeTiles, 1);
  },

  markerResizer() {
    var repositionMarkers = function() {
      let $markers     = Ember.$('.marker');
      let $marker      = $markers.first();
      let markerWidth  = $marker.width() / 2;
      let markerHeight = $marker.height() / 2;
      let $tile        = Ember.$('.tile').first();
      let left         = ($tile.width() / 2 - markerWidth);
      let bottom       = ($tile.height() / 2 + markerHeight);

      $markers.css({bottom: bottom, left: left});
    };

    this.repositionMarkers = repositionMarkers;
    Ember.$(window).bind('resize', repositionMarkers);
    setTimeout(repositionMarkers, 1);
  },

  actions: {
    takeTurn(row, column){
      var position = '.' + row + '.' + column;

      if( this.get('gameState').isSpaceTaken(position) ){
        return;
      } else {
        this.get('gameState').userTurn(position);
      }
    }
  },
  // private methods
  _markPosition(position, player){
    let playerMarker = this.get(player + 'Marker');
    Ember.$(position + ' .fa').addClass(playerMarker + ' marker');
    this.markerResizer();
  }
});
