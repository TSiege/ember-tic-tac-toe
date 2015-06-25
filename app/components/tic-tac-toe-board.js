import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this.tileResizer();
    this.markerResizer();

    this._super();
  },

  willDestroy: function() {
    Em.$(window).unbind('resize', this.get('resizeTiles'));
    Em.$(window).unbind('resize', this.get('repositionMarkers'));
    this._super();
  },

  tileResizer: function(){
    var resizeTiles = function(){
      var $tiles = Em.$('.tile');
      var width  = $tiles.first().width();

      $tiles.css({height: width});
    };

    this.set('resizeTiles', resizeTiles);
    Em.$(window).bind('resize', this.get('resizeTiles'));
    setTimeout(resizeTiles, 1);
  },

  markerResizer: function() {
    var repositionMarkers = function() {
      var $markers     = Em.$('.marker');
      var $marker      = $markers.first();
      var markerWidth  = $marker.width();
      var markerHeight = $marker.height();
      var $tile        = Em.$('.tile').first();
      var left         = ($tile.width() / 2 - markerWidth);
      var bottom       = ($tile.height() / 2 + markerHeight);

      $markers.css({bottom: bottom, left: left});
    };

    this.set('repositionMarkers', repositionMarkers);
    Em.$(window).bind('resize', this.get('repositionMarkers'));
    setTimeout(repositionMarkers, 1);
  },

  action: {
    move: function(){
      console.log(this);
    }
  }
});
