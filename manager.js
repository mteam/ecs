var is = require('helpers').is,
    Container = require('component-model').Container,
    Finder = require('./finder');

function SystemManager(entities) {
  Container.call(this);

  if (!(entities instanceof Container)) {
    throw new Error('Entities are not a container');
  }

  this.entities = entities;
}

SystemManager.prototype = Object.create(Container.prototype);

SystemManager.prototype.add = function(system) {
  if (is.func(system)) {
    system = new system;
  }

  Container.prototype.add.call(this, system);
};

SystemManager.prototype.getSystem = function(name) {
  return this.get(name);
};

SystemManager.prototype.createFinder = function(components) {
  return new Finder(this.entities, components);
};

SystemManager.prototype.iterator = function(name) {
  var self = this;

  return function() {
    for (var i = 0, system; i < self.components.length; i++) {
      system = self.components[i];
      system[name] && system[name].apply(system, arguments);
    }
  }
};

module.exports = SystemManager;
