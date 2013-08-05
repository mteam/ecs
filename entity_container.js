var Container = require('container');
var Entity = require('./entity.js');
var Filter = require('container-filter');

function EntityContainer() {
  Container.call(this);
}

EntityContainer.prototype = Object.create(Container.prototype);
EntityContainer.prototype.constructor = EntityContainer;

EntityContainer.prototype.select = function() {
  var components = Array.prototype.slice.call(arguments);
  var filter = new Filter(this, components);

  return filter;
};

EntityContainer.prototype.create = function() {
  var entity = Entity.create.apply(Entity, arguments);
  Container.prototype.add.call(this, entity);
  
  return entity;
};

module.exports = EntityContainer;
