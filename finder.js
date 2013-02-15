function Finder(container, components) {
  this.container = container; // entity container
  this.components = components;
  this.entities = null;
}

Finder.prototype.all = function() {
  if (this.entites == null) {
    var entities = this.container.components;
    this.entities = entities.filter(this.isRequested, this);
  }

  return this.entities;
};

Finder.prototype.isRequested = function(entity) {
  return this.components.every(entity.has, entity);
};

Finder.prototype.each = function(fn, context) {
  var es = this.all();

  for (var i = 0; i < es.length; i++) {
    fn.call(context, es[i]);
  }

  return this;
};

Finder.prototype.single = function() {
  var es = this.all();

  if (es.length != 1)
    throw new Error('expected just one entity, got ' + es.length + ' instead');

  return es[0];
};

module.exports = Finder;
