var bind = require('bind');
var BaseSet = require('./base_set.js');

function Sorter(entities, compare) {
  BaseSet.call(this);

  this.compare = compare;

  entities.on('change', bind(this, this.onChange));
  entities.on('remove', bind(this, this.onRemove));
  entities.items.forEach(this.onChange, this);
}

Sorter.prototype = Object.create(BaseSet.prototype);
Sorter.prototype.constructor = Sorter;

Sorter.prototype.onChange = function(entity) {
  this.trigger('change', entity);

  var items = this.items;

  for (var i = 0; i < items.length; i++) {
    if (this.compare(entity, items[i]) < 0) {
      items.splice(i, 0, entity);
      return;
    }
  }

  items.push(entity);
};

Sorter.prototype.onRemove = function(entity) {
  this.remove(entity);
};

module.exports = Sorter;
