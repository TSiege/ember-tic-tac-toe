var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    hinting: false
  });

  app.import('./bower_components/lodash/lodash.js');
  app.import('./bower_components/skeleton/css/skeleton.css');

  return app.toTree();
};
