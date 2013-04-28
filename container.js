var is = require('helpers').is,
    Container = require('component-model').Container,
    Filter = require('container-filter');

module.exports = SystemContainer;

function SystemContainer(entities) {
  Container.call(this);

  if (!(entities instanceof Container)) {
    throw new Error('Entities are not a container');
  }

  this.entities = entities;
}

var proto = SystemContainer.prototype =
  Object.create(Container.prototype);

proto.add = function(system) {
  if (is.func(system)) {
    system = new system;
  }

  Container.prototype.add.call(this, system);
};

proto.createFinder = function(components) {
  return new Filter(this.entities, components);
};

proto.iterator = function(name) {
  var self = this;

  return function() {
    for (var i = 0, system; i < self.components.length; i++) {
      system = self.components[i];
      system[name] && system[name].apply(system, arguments);
    }
  }
};
