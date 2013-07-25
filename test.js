var assert = require('assert'),
    sham = require('sham');

var Entity = require('ecs/entity.js'),
    EntityContainer = require('ecs/entity_container.js'),
    SystemContainer = require('ecs/system_container.js');

describe('ecs', function() {

  describe('SystemContainer', function() {

    it('adds systems', function() {
      var entities = new EntityContainer,
          container = new SystemContainer(entities);

      var foo = sham.spy().args(entities).called(),
          bar = sham.spy().args(entities).called();

      container.add(foo);
      container.add(bar);

      foo.check();
      bar.check();
    });

    it('creates iterator', function() {
      var container = new SystemContainer(new EntityContainer);

      function foo() {}
      foo.prototype.baz = sham.spy('baz').called().args(1, 2, 3);

      function bar() {}
      bar.prototype.baz = sham.spy('baz').called().args(1, 2, 3);
      bar.prototype.quux = sham.spy('quux').called().args(4, 5, 6);

      container.add(foo);
      container.add(bar);

      var ifoo = container.iterator('baz'),
          ibar = container.iterator('quux');

      ifoo(1, 2, 3);
      ibar(4, 5, 6);

      foo.prototype.baz.check();
      bar.prototype.baz.check();
      bar.prototype.quux.check();
    });

  });

  describe('EntityContainer', function() {

    var components = {
      foo: { name: 'foo' },
      bar: { name: 'bar' }
    };

    it('creates named entities', function() {
      var container = new EntityContainer;

      container.create('entity', components.foo, components.bar);

      var entity = container.get('entity');

      assert.ok(entity);
      assert.deepEqual(entity.components, [components.foo, components.bar]);
    });

    it('creates unnamed entities', function() {
      var container = new EntityContainer;

      container.create(components.foo, components.bar);

      var entity = container.components[0];

      assert.equal(entity.name, null);
      assert.deepEqual(entity.components, [components.foo, components.bar]);
    });

  });

});
