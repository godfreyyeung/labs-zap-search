import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled, waitFor } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import seedMirage from '../../../../../../mirage/scenarios/default';

module('Unit | Controller | my-projects/project/recommendations/add', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function() {
    seedMirage(server);
    this.controller = this.owner.lookup('controller:my-projects/project/recommendations/add');
    this.store = this.owner.lookup('service:store');
    this.controller.set('store', this.store);
    const user = await this.store.findRecord('user', 1);
    this.controller.set('recommendation', this.store.createRecord('community-board-recommendation', {
      user: user
    }));
    this.controller.transitionToRoute = function(route, proj){
      return new Promise((resolve, reject) => { resolve(); });
    };
  });

  test('it exists', function(assert) {
    assert.ok(this.controller);
  });

  test('setProp sets a property', function(assert) {
    assert.equal(this.controller.allActions, true);
    this.controller.send("setProp", "allActions", false);
    assert.equal(this.controller.allActions, false);
  });

  test('updateRecAttr updates the route Recommendation attribute', function(assert) {
    assert.equal(this.controller.recommendation.voteLocation, "");
    this.controller.send("updateRecAttr", "voteLocation", "Oregon");
    assert.equal(this.controller.recommendation.voteLocation, "Oregon");
  });

  test('addActionToOption', function(assert) {
    const anAction = this.store.createRecord('action');
    assert.equal(this.controller.recommendationOptions.approved.actions.length, 0);
    this.controller.send("addActionToOption", anAction, "approved");
    assert.equal(this.controller.recommendationOptions.approved.actions.length, 1);
  });

  test('submitRecommendation submits one rec for all actions if allActions === true', async function(assert) {
    assert.equal(this.controller.allActions, true);

    // Set up a project with two actions.
    const testAction1 = await this.store.createRecord('action', {
      actionCode: "OR",
    });
    const testAction2 = await this.store.createRecord('action', {
      actionCode: "ZZ",
    });
    let testProject = await this.store.createRecord('project');
    testProject.set('actions', [testAction1, testAction2]);
    this.controller.set('model', testProject);

    // ensure store has one unsaved recommendation
    let originalStoreRecommendations = await this.store.findAll('community-board-recommendation');
    assert.equal(originalStoreRecommendations.length, 1);
    assert.equal(originalStoreRecommendations.firstObject.isNew, true);
    assert.equal(this.controller.recommendation.actions.length, 0);
    assert.equal(this.controller.recommendation.isNew, true);

    this.controller.send("submitRecommendation");

    await settled();

    let newStoreRecommendations = await this.store.findAll('community-board-recommendation');
    // ensure controller's recommendation is saved
    assert.equal(originalStoreRecommendations.firstObject.isNew, false);
    assert.equal(this.controller.recommendation.isNew, false);

    // check no extra recommendations were saved to store.
    assert.equal(newStoreRecommendations.length, 1);

    // check saved recommendation has all two actions
    assert.equal(newStoreRecommendations.firstObject.actions.length, 2);
  });

  test('submitRecommendation submits multiple reccs if allActions === false', async function(assert) {
    this.controller.set('allActions', false);
    assert.equal(this.controller.allActions, false);
  });
});
