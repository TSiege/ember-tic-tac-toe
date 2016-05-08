import Ember from 'ember';
import { COMPUTER } from '../utils/scoring';
const { $, observer, inject, Component, computed } = Ember;

const TIED_TEXT = [
  `Phew, the human race is safe \n for now...`,
  `You're like the John Henry of Tic Tac Toe`,
  `You're safe from automation`,
  `You get a gold star!`,
  `Your mom is gonna be so proud!`
];

const LOST_TEXT = [
  `The human race is boned`,
  `This is how Skynet began`,
  `At this rate you're only gonna be useful in the skeleton war`,
  `Still think your Roomba is your friend?`,
  `Let's hope the 3 laws work`,
  `At least this isn't your real job`,
  `Wanna join the neo ludites yet?`
];

export default Component.extend({
  rows: ['top', 'center', 'bottom'],
  columns: ['left', 'middle', 'right'],
  gameState: inject.service('gameState'),
  hasGameStarted: false,

  init() {
    this._tileResizer();

    this._super(...arguments);
  },

  updateBoard: observer('gameState.lastTurn', function(){
    let player   = this.get('gameState.lastTurn.player');
    let position = this.get('gameState.lastTurn.position');
    this._markPosition(position, player);
  }),

  hasTied: computed('gameState.hasTied', function(){
    return this.get('gameState.hasTied');
  }),

  hasComputerWon: computed('gameState.hasComputerWon', function(){
    return this.get('gameState.hasComputerWon');
  }),

  randomTiedText: computed(function(){
    let i = Math.floor(Math.random() * TIED_TEXT.length);
    return TIED_TEXT[i];
  }).volatile(),

  randomLostText: computed(function(){
    let i = Math.floor(Math.random() * LOST_TEXT.length);
    return LOST_TEXT[i];
  }).volatile(),

  willDestroy() {
    $(window).unbind('resize', this.resizeTiles);
    $(window).unbind('resize', this.repositionMarkers);
    this._super();
  },

  actions: {
    takeTurn(row, column){
      if (!this.get('hasGameStarted')) { return; }
      let position = `.${row}.${column}`;
      this.get('gameState').userTurn(position);
    },

    startGame(player){
      this.set('hasGameStarted', true);
      if (player === COMPUTER) {
        this.get('gameState').computerTurn();
      }
    },

    reset(){
      this.get('gameState').reset();
      this._clearBoard();
      this.set('hasGameStarted', false);
    }
  },

  //private methods
  _tileResizer(){
    let resizeTiles = function(){
      let $tiles = $('.tile');
      let width  = $tiles.first().width();

      $tiles.css({height: width});
    };

    this.resizeTiles = resizeTiles;
    $(window).bind('resize', this.get('resizeTiles'));
    setTimeout(resizeTiles, 1);
  },

  _markPosition(position, player){
    let marker = player === COMPUTER ? 'o' : 'x';
    $(`${position} .tile-content`).text(marker);
  },

  _clearBoard(){
    this.get('rows').forEach((row) => {
      this.get('columns').forEach((col) => {
        $(`.${row}.${col} .tile-content`).text('');
      });
    });
  }
});
