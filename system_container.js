var Container = require('container');

function SystemContainer(entities) {
  Container.call(this);
  this.entities = entities;
}

SystemContainer.prototype = Object.create(Container.prototype);
SystemContainer.prototype.constructor = SystemContainer;

SystemContainer.prototype.add = function(system) {
  var instance = new system(this.entities);
  Container.prototype.add.call(this, instance);
};

SystemContainer.prototype.iterator = function(method) {
  var this_ = this;

  return function() {
    for (var i = 0; i < this_.components.length; i++) {
      var system = this_.components[i];

      if (typeof system[method] == 'function') {
        system[method].apply(system, arguments);
      }
    }
  };
};

module.exports = SystemContainer;
