var Container = require('component-model').Container,
    is = require('helpers').is;

function Entity(name) {
  Container.call(this, name);
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
    if (is.func(arguments[i])) {
      entity.add(new arguments[i]);
    } else {
      entity.add(arguments[i]);
    }

    i++;
  }

  return entity;
};

Entity.prototype = Object.create(Container.prototype);

Entity.prototype.has = function(name) {
  return !!this.get(name, false);
};

module.exports = Entity;
