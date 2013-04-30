var Container = require('container'),
    Filter = require('container-filter');
    to = require('helpers').to,
    is = require('helpers').is;

module.exports = EntityContainer;

function EntityContainer() {
  Container.call(this);
}

EntityContainer.prototype.select = function() {
  var components = to.array(arguments),
      filter = new Filter(this, components);

  return filter;
};

EntityContainer.prototype.add = function(name) {
  var components = to.array(arguments);

  if (is.string(name)) {
    components.splice(0, 1);
  }

  var entity = new Entity(name);
  components.forEach(entity.add, entity);

  Container.prototype.add.call(this, entity);
};
