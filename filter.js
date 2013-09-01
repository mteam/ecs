var bind = require('bind');
var BaseSet = require('./base_set.js');

function Filter(entities, components) {
  BaseSet.call(this);

  this.components = components;

  entities.on('change', bind(this, 'change'));
  entities.on('remove', bind(this, 'remove'));
  entities.items.forEach(this.change, this);
}

Filter.prototype = Object.create(BaseSet.prototype);
Filter.prototype.constructor = Filter;

Filter.prototype.change = function(entity) {
  var matches = this.matches(entity);
  var has = this.has(entity);

  if (!has && matches) {
    this.add(entity);
  }

  if (has && !matches) {
    this.remove(entity);
  }
};

Filter.prototype.remove = function(entity) {
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
