import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

class RecommendationOption extends EmberObject {
  label = '';
  code = '';
  actions = A();
}

// Returns a new record of the same model as `recommendation`
// and copies all existing attributes from `recommendation`.
// It does not yet persist the new record.
function cloneRecommendationRecord(recommendation, store) {
  let recommendationCopy = store.createRecord(recommendation.constructor.modelName, {
  ...(recommendation.toJSON())
  });

  if (recommendation.user) {
    recommendationCopy.set('user', recommendation.user);
  }
  if (recommendation.actions) {
    recommendationCopy.set('actions', recommendation.actions);
  }

  return recommendationCopy;
}

export default class MyProjectsProjectRecommendationsAddController extends Controller {
  queryParams = ['participantType'];

  @service
  store;

  @service
  currentUser;

  // the project is available through the model.

  // the participant-type-dependent Recommendation is set up within the router's
  // setupController.

  // if the new recommendation applies to all actions
  allActions = true;

  recommendationOptions = EmberObject.create({
    'approved': RecommendationOption.create({
      label: 'Approved',
      code: 'approved',
    }),
    'approved-with-modifications-conditions': RecommendationOption.create({
      label: 'Approved with Modifications/Conditions',
      code: 'approved-with-modifications-conditions',
    }),
    'disapproved': RecommendationOption.create({
      label: 'Disapproved',
      code: 'disapproved',
    }),
    'disapproved-with-modifications-conditions': RecommendationOption.create({
      label: 'Disapproved with Modifications/Conditions',
      code: 'disapproved-with-modifications-conditions',
    }),
    'non-complying': RecommendationOption.create({
      label: 'Non-Complying',
      code: 'non-complying',
    }),
    'vote-quorum-not-present': RecommendationOption.create({
      label: 'Vote Quorum Not Present',
      code: 'vote-quorum-not-present',
    }),
    'received-after-clock-expired': RecommendationOption.create({
      label: 'Received after Clock Expired',
      code: 'received-after-clock-expired',
    }),
    'no-objection': RecommendationOption.create({
      label: 'No Objection',
      code: 'no-objection',
    }),
    'waiver-of-recommendation': RecommendationOption.create({
      label: 'Waiver of Recommendation',
      code: 'waiver-of-recommendation',
    }),
  });

  @action
  setProp(property, newVal) {
    this.set(property, newVal);
  }

  @action
  updateRecAttr(attrName, newVal) {
    this.recommendation.set(attrName, newVal);
  }

  @action
  addActionToOption(projAction, selectedOptionCode) {
    for(let optionCode of Object.keys(this.recommendationOptions)) {
      this.recommendationOptions[optionCode].actions.removeObject(projAction);
      this.recommendationOptions[optionCode].notifyPropertyChange('actions');
    };
    this.recommendationOptions[selectedOptionCode].actions.addObject(projAction);
    this.recommendationOptions[selectedOptionCode].notifyPropertyChange('actions');
  }

  @action
  submitRecommendation() {
    let project = this.model;
    let savePromise;
    if (this.allActions) {
      this.recommendation.set('actions', project.actions);
      savePromise = this.recommendation.save();
    } else {
      for (let optionCode of Object.keys(this.recommendationOptions)) {
        let recommendationOption = this.recommendationOptions[optionCode];
        if (recommendationOption.actions.length) {
          let recommendationCopy = cloneRecommendationRecord(this.recommendation, this.store);
          recommendationCopy.set('actions', recommendationOption.actions);
          savePromise = recommendationCopy.save();
        }
      }
    }
    if (savePromise) {
      savePromise.then(() => {
        // TODO: transition to my-projects.project.recommendation.view
        this.transitionToRoute("my-projects.project.recommendations.view", project);
      }, () => {
        this.set("error", "Oops, there was an error submitting your recommendation.");
      });
    }
  }
};
