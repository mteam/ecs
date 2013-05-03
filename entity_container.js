var Container = require('container'),
    Filter = require('container-filter');
    to = require('helpers').to,
    is = require('helpers').is,
    Entity = require('./entity.js');

module.exports = EntityContainer;

function EntityContainer() {
  Container.call(this);
}

EntityContainer.prototype = Object.create(Container.prototype);

EntityContainer.prototype.select = function() {
  var components = to.array(arguments),
      filter = new Filter(this, components);

  return filter;
};

EntityContainer.prototype.add = function() {
  var components = to.array(arguments);

  if (is.string(arguments[0])) {
    var name = arguments[0];
    components.splice(0, 1);
  }

  var entity = new Entity(name);
  components.forEach(entity.add, entity);

  Container.prototype.add.call(this, entity);
};
