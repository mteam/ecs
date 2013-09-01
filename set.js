var BaseSet = require('./base_set.js');
var Entity = require('./entity.js');
var Filter = require('./filter.js');

function EntitySet() {
  BaseSet.call(this);
}

EntitySet.prototype = Object.create(BaseSet.prototype);
EntitySet.prototype.constructor = EntitySet;

EntitySet.prototype.add = function(entity) {
  entity.attach(this);
  BaseSet.prototype.add.call(this, entity);
};

EntitySet.prototype.create = function() {
  var entity = Entity.create.apply(Entity, arguments);
  this.add(entity);

  return entity;
};

EntitySet.prototype.select = function() {
  var components = Array.prototype.slice.call(arguments);
  var filter = new Filter(this, components);

  return filter;
};

module.exports = EntitySet;
