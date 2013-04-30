var Container = require('container');

module.exports = Entity;

function Entity(name) {
  Container.call(this, name);
}

Entity.prototype = Object.create(Container.prototype);

Entity.prototype.add = function(component) {
  if (is.func(component)) {
    component = new component;
  }

  Container.prototype.add.call(this, component);
};
