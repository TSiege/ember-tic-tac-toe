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
  this.computer.board = [['O','2','3'],['4','5','6'],['7','8','9']];
  this.computer.takeTurn();
  assert.deepEqual(this.computer.board, [['O','2','3'],['4','X','6'],['7','8','9']]);
});
test('plays in any corner when user\'s first move is the center', function(){
  this.computer.board = [['1','2','3'],['4','O','6'],['7','8','9']];
  this.computer.takeTurn();
  assert.deepEqual(this.computer.board, [['X','2','3'],['4','O','6'],['7','8','9']] );
  assert.deepEqual(this.computer.board, [['1','2','X'],['4','O','6'],['7','8','9']] );
  assert.deepEqual(this.computer.board, [['1','2','3'],['4','O','6'],['X','8','9']] );
  assert.deepEqual(this.computer.board, [['1','2','3'],['4','O','6'],['7','8','X']] );
});
test('blocks the user from winning', function(){
  this.computer.board = [['1','X','3'],['4','5','6'],['7','O','O']];
  this.computer.takeTurn();
  assert.deepEqual(this.computer.board, [['1','X','3'],['4','5','6'],['X','O','O']]);
});
test('completes a horizontal win', function(){
  this.computer.board = [['X','X','3'],['O','O','6'],['X','O','O']];
  this.computer.takeTurn();
  assert.deepEqual(this.computer.board, [['X','X','X'],['O','O','6'],['X','O','O']]);
});
test('completes a vertical win', function(){
  this.computer.board = [['X','X','O'],['4','O','6'],['X','O','O']];
  this.computer.takeTurn();
  assert.deepEqual(this.computer.board, [['X','X','O'],['X','O','6'],['X','O','O']]);
});
test('completes a diagonal win', function(){
  this.computer.board = [['X','O','X'],['O','5','O'],['X','8','O']];
  this.computer.takeTurn();
  assert.deepEqual(this.computer.board, [['X','O','X'],['O','X','O'],['X','8','O']]);
});
test('prioritizes winning over blocking', function(){
  this.computer.board = [['O','X','O'],['O','X','O'],['7','8','X']];
  this.computer.takeTurn();
  assert.deepEqual(this.computer.board, [['O','X','O'],['O','X','O'],['7','X','X']]);
});