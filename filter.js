var bind = require('bind');
var BaseSet = require('./base_set.js');

function Filter(entities, components) {
  BaseSet.call(this);

  this.components = components;

  entities.on('change', bind(this, 'onChange'));
  entities.on('remove', bind(this, 'onRemove'));
  entities.on('clear', bind(this, 'clear'));
  entities.items.forEach(this.onChange, this);
}

Filter.prototype = Object.create(BaseSet.prototype);
Filter.prototype.constructor = Filter;

Filter.prototype.onChange = function(entity) {
  var matches = this.matches(entity);
  var has = this.has(entity);

  if (!has && matches) {
    this.add(entity);
  }

  if (has && !matches) {
    this.remove(entity);
  }
};

Filter.prototype.onRemove = function(entity) {
  if (this.matches(entity)) {
    BaseSet.prototype.remove.call(this, entity);
  }
};

Filter.prototype.matches = function(entity) {
  return this.components.every(entity.has, entity);
};

Filter.prototype.all = function() {
  return this.items;
};

Filter.prototype.single = function() {
  if (this.items.length != 1) {
    throw Error('Expected just one component, got ' + this.items.length + ' instead');
  }

  return this.items[0];
};

module.exports = Filter;
