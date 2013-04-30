var Container = require('container'),
    is = require('helpers').is;

module.exports = SystemContainer;

function SystemContainer(entities) {
  Container.call(this);
  this.entities = entities;
}

SystemContainer.prototype = Object.create(Container.prototype);

SystemContainer.prototype.add = function(system) {
  var instance = new system(this.entities);
  Container.prototype.add.call(this, instance);
};

SystemContainer.prototype.iterator = function(method) {
  var this_ = this;

  return function() {
    for (var i = 0; i < this_.components.length; i++) {
      var system = this_.components[i];

      if (is.func(system[method])) {
        system[method].apply(system, arguments);
      }
    }
  };
};
