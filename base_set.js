var Events = require('events');

function BaseSet() {
  Events.extend(this);
  this.items = [];
}

BaseSet.prototype.add = function(entity) {
  this.items.push(entity);
  this.trigger('change', entity);
};

BaseSet.prototype.has = function(entity) {
  return !!~this.items.indexOf(entity);
};

BaseSet.prototype.remove = function(entity) {
  var index = this.items.indexOf(entity);

  if (index > -1) {
    this.items.splice(index, 1);
    this.trigger('remove', entity);
  } else {
    throw Error('Entity is not in collection');
  }
};

BaseSet.prototype.clear = function() {
  this.items.length = 0;
  this.trigger('clear');
};

module.exports = BaseSet;
