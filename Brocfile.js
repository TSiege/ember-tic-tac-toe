var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  hinting: false
});

app.import('./bower_components/lodash/lodash.js');

module.exports = app.toTree();
