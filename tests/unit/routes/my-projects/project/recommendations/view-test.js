import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | my-projects/project/recommendations/view', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:my-projects/project/recommendations/view');
    assert.ok(route);
  });
});
