var Container = require('component-model').Container,
    is = require('helpers').is;

module.exports = Entity;

function instance(obj) {
  return is.func(obj) ? new obj : obj;
}

Entity.create = function() {
  var name, i;

  if (is.string(arguments[0])) {
    name = arguments[0];
    i = 1;
  } else {
    i = 0;
  }

  var entity = new Entity(name);

  while (i < arguments.length) {
    entity.add(instance(arguments[i++]));
  }

  return entity;
};

function Entity(name) {
  Container.call(this, name);
}

Entity.prototype = Object.create(Container.prototype);
