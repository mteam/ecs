var Container = require('container');

Entity.create = function() {
  var components = Array.prototype.slice.call(arguments);

  if (typeof arguments[0] == 'string') {
    var name = arguments[0];
    components.splice(0, 1);
  }

  var entity = new Entity(name);
  components.forEach(entity.add, entity);

  return entity;
};

function Entity(name) {
  Container.call(this, name);
}

Entity.prototype = Object.create(Container.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.add = function(component) {
  if (typeof component == 'function') {
    component = new component();
  }

  Container.prototype.add.call(this, component);
};

module.exports = Entity;
