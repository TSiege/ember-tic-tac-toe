import { moduleFor, test } from 'ember-qunit';

moduleFor('object:user', 'User', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var object = this.subject();
  // var store = this.store();
  assert.ok(!!object);
});
