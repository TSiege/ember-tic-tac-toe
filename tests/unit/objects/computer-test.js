import { 
  moduleFor,
  test,
  assert
} from 'ember-qunit';

moduleFor('object:computer', 'Computer', {
  beforeEach: function(){
    this.computer = this.subject({});
  }
});

test('plays in the center when user\'s first move is a corner', function(){
  var board = [['O','2','3'],['4','5','6'],['7','8','9']];
  var move = this.computer.takeTurn(board);
  assert.deepEqual(move, [['O','2','3'],['4','X','6'],['7','8','9']]);
});
test('plays in any corner when user\'s first move is the center', function(){
  var board = [['1','2','3'],['4','O','6'],['7','8','9']];
  var move = this.computer.takeTurn(board);
  assert.deepEqual(move, [['X','2','3'],['4','O','6'],['7','8','9']] );
  assert.deepEqual(move, [['1','2','X'],['4','O','6'],['7','8','9']] );
  assert.deepEqual(move, [['1','2','3'],['4','O','6'],['X','8','9']] );
  assert.deepEqual(move, [['1','2','3'],['4','O','6'],['7','8','X']] );
});
test('blocks the user from winning', function(){
  var board = [['1','X','3'],['4','5','6'],['7','O','O']];
  var move = this.computer.takeTurn(board);
  assert.deepEqual(move, [['1','X','3'],['4','5','6'],['X','O','O']]);
});
test('completes a horizontal win', function(){
  var board = [['X','X','3'],['O','O','6'],['X','O','O']];
  var move = this.computer.takeTurn(board);
  assert.deepEqual(move, [['X','X','X'],['O','O','6'],['X','O','O']]);
});
test('completes a vertical win', function(){
  var board = [['X','X','O'],['4','O','6'],['X','O','O']];
  var move = this.computer.takeTurn(board);
  assert.deepEqual(move, [['X','X','O'],['X','O','6'],['X','O','O']]);
});
test('completes a diagonal win', function(){
  var board = [['X','O','X'],['O','5','O'],['X','8','O']];
  var move = this.computer.takeTurn(board);
  assert.deepEqual(move, [['X','O','X'],['O','X','O'],['X','8','O']]);
});
test('prioritizes winning over blocking', function(){
  var board = [['O','X','O'],['O','X','O'],['7','8','X']];
  var move = this.computer.takeTurn(board);
  assert.deepEqual(move, [['O','X','O'],['O','X','O'],['7','X','X']]);
});