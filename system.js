var to = require('helpers').to,
    Component = require('component-model').Component;

function System(name) {
  if (name == null) {
    throw new Error('System name has not been specified');
  }

  Component.call(this, name);
}

System.prototype = Object.create(Component.prototype);

System.prototype.attach = function(parent) {
  Component.prototype.attach.call(this, parent);
  this.initialize && this.initialize();
};

System.prototype.find = function() {
  return this.getParent().createFilter(to.array(arguments));
};

System.prototype.system = function(name) {
  return this.getParent().get(name);
};

System.prototype.entities = function() {
  return this.getParent().entities;
};

module.exports = System;
