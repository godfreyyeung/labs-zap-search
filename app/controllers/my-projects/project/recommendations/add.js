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
function cloneRecommendationRecord(recommendation) {
  let recommendationCopy = this.store.createRecord(recommendation.constructor.modelName);

  recommendation.fields.forEach((kind, field) => {
    if(recommendation.get(field)){
      recommendationCopy.set(field, recommendation.get(field));
    }
  });

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
  updateRecAttr(attrName, newVal) {
    this.recommendation.set(attrName, newVal);
  }

  @action
  setProp(property, newVal) {
    this.set(property, newVal);
  }

  @action
  addActionToOption(projAction, selectedOptionCode) {
    for(let option of Object.keys(this.recommendationOptions)) {
      this.recommendationOptions[option].actions.removeObject(projAction);
      this.recommendationOptions[option].notifyPropertyChange('actions');
    };
    this.recommendationOptions[selectedOptionCode].actions.addObject(projAction);
    this.recommendationOptions[selectedOptionCode].notifyPropertyChange('actions');
  }

  @action
  submitRecommendation(recommendation) {
    if (allActions) {
      recommendation.actions = this.model.project.actions;
      recommendation.save();
    } else {

      for (let recommendationType of [approvedActions, approvedModificationsActions,
        disapprovedActions, disapprovedModificationsActions]) {
      }

      if (approvedActions) {
        let recommendationCopy = cloneRecommendationRecord();
        recommendationCopy.actions = approvedActions;
        recommendationCopy.save();
      }
      if (approvedModificationsActions) {
        let recommendationCopy = cloneRecommendationRecord();
        recommendationCopy.actions = approvedModificationsActions;
        recommendationCopy.save();
      }
      if(disapprovedActions) {
        let recommendationCopy = cloneRecommendationRecord();
        recommendationCopy.actions = disapprovedActions;
        recommendationCopy.save();
      }
      if(disapprovedModificationsActions) {
        let recommendationCopy = cloneRecommendationRecord();
        recommendationCopy.actions = disapprovedModificationsActions;
        recommendationCopy.save();
      }
    }
  }
};
