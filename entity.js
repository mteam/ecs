Entity.create = function() {
  var components = Array.prototype.slice.call(arguments);

  if (typeof arguments[0] == 'string') {
    var name = arguments[0];
    components.splice(0, 1);
  }

  var entity = new Entity(name);
  components.forEach(entity.add, entity);

  return entity;
};

function Entity(name) {
  this.name = name;
  this.components = {};
}

Entity.prototype.attach = function(collection) {
  this.collection = collection;
};

Entity.prototype.change = function() {
  if (this.collection) {
    this.collection.trigger('change', this);
  }
};

Entity.prototype.get = function(name) {
  return this.components[name];
};

Entity.prototype.has = function(name) {
  return name in this.components;
};

Entity.prototype.add = function(component) {
  if (typeof component == 'function') {
    component = new component();
  }
  
  this.components[component.name] = component;
  this.change();
};

Entity.prototype.remove = function(name) {
  delete this.components[name];
  this.change();
};

module.exports = Entity;
