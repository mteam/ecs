var to = require('helpers').to,
    Component = require('component-model').Component;

function System() {
  if (this.name == null) {
    throw new Error('System name has not been specified');
  }

  Component.call(this, this.name);
}

System.prototype = Object.create(Component.prototype);

System.prototype.attach = function(parent) {
  Component.prototype.attach.call(this, parent);
  this.initialize && this.initialize();
};

System.prototype.find = function() {
  return this.getParent().createFinder(to.array(arguments));
};

System.prototype.getSystem = function(name) {
  return this.getParent().getSystem(name);
};

module.exports = System;
