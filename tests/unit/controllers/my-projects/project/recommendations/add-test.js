import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | my-projects/project/recommendations/add', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:my-projects/project/recommendations/add');
    assert.ok(controller);
  });
});
