var assert = require('assert');
var ecs = require('ecs');

describe('ecs', function() {

  describe('EntitySet', function() {

    var components = {
      foo: { name: 'foo' },
      bar: { name: 'bar' }
    };

    it('creates entities', function() {
      var es = new ecs.EntitySet();
      es.create('entity', components.foo, components.bar);

      var entity = es.items[0];

      assert(entity.name == 'entity');
      assert(entity.components.foo == components.foo);
      assert(entity.components.bar == components.bar);
    });

    it('removes entities', function() {
      var es = new ecs.EntitySet();
      var entity = es.create('entity');
      es.remove(entity);

      assert(es.items.length == 0);
    });

  });

  describe('Filter', function() {
    
    it('filters entities', function() {
      var es = new ecs.EntitySet();
      es.create({ name: 'foo' });

      var filter = es.select('foo', 'baz');
      es.create({ name: 'foo' }, { name: 'bar' });
      es.create({ name: 'foo' }, { name: 'baz' });
      es.create({ name: 'foo' }, { name: 'baz' }, { name: 'bar' });
      es.create({ name: 'bar' });

      assert(filter.items.length == 2);
    });

    it('reacts to added/removed components', function() {
      var es = new ecs.EntitySet();
      var filter = es.select('foo');

      var e1 = es.create();
      var e2 = es.create({ name: 'bar' });
      assert(filter.items.length == 0);

      e1.add({ name: 'foo' });
      e2.add({ name: 'foo' });
      assert(filter.items.length == 2);

      e1.remove('foo');
      assert(filter.items.length == 1);
    });

    it('returns single entity', function() {
      var es = new ecs.EntitySet();
      var filter = es.select();
      var entity = es.create();

      assert(filter.single() == entity);

      es.create();

      try {
        filter.single();
        assert(false, 'no exception thrown');
      } catch (err) {
        assert(err);
      }
    });

    it('clears', function() {
      var es = new ecs.EntitySet();
      var filter = es.select();

      es.create();
      es.clear();

      assert(filter.items.length == 0);
    });
  
  });

  describe('Sorter', function() {

    function entity(a) {
      return ecs.Entity.create({
        name: 'foo',
        a: a
      });
    }
    
    it('sorts components', function() {
      var es = new ecs.EntitySet();

      var three = entity(3);
      es.add(three);
      es.add(entity(7));
      es.add(entity(5));

      var sorter = new ecs.Sorter(es, function(a, b) {
        return a.get('foo').a - b.get('foo').a;
      });

      es.add(entity(2));
      es.add(entity(4));
      es.add(entity(8));
      es.remove(three);

      assert(sorter.items[0].get('foo').a == 2);
      assert(sorter.items[2].get('foo').a == 5);
      assert(sorter.items[4].get('foo').a == 8);
    });

    it('clears', function() {
      var es = new ecs.EntitySet();
      var sorter = new ecs.Sorter(es, function() { return 0 });

      es.create();
      es.clear();

      assert(sorter.items.length == 0);
    });
  
  });

});
