import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

const recommendationOption = EmberObject.extend({
  label: '',
  code: '',
  actions: A(),
});

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

  recommendationOptions = {
    'approved': recommendationOption.create({
      label: 'Approved',
      code: 'approved',
    }),
    'approved-with-modifications-conditions': recommendationOption.create({
      label: 'Approved with Modifications/Conditions',
      code: 'approved-with-modifications-conditions',
    }),
    'disapproved': recommendationOption.create({
      label: 'Disapproved',
      code: 'disapproved',
    }),
    'disapproved-with-modifications-conditions': recommendationOption.create({
      label: 'Disapproved with Modifications/Conditions',
      code: 'disapproved-with-modifications-conditions',
    }),
    'non-complying': recommendationOption.create({
      label: 'Non-Complying',
      code: 'non-complying',
    }),
    'vote-quorum-not-present': recommendationOption.create({
      label: 'Vote Quorum Not Present',
      code: 'vote-quorum-not-present',
    }),
    'received-after-clock-expired': recommendationOption.create({
      label: 'Received after Clock Expired',
      code: 'received-after-clock-expired',
    }),
    'no-objection': recommendationOption.create({
      label: 'No Objection',
      code: 'no-objection',
    }),
    'waiver-of-recommendation': recommendationOption.create({
      label: 'Waiver of Recommendation',
      code: 'waiver-of-recommendation',
    }),
  };

  /*
    `mutateArray` "toggles" a set of value(s) against an array, meaning they
    are either removed or added if they're present or absent, respectively.
    @param {string} key
    @param {number[]|string[]|object[]} values
  */
  @action
  mutateArray(key, ...values) {
    // BEWARE: binding this to 'onClick=' will insert the mouseEvent
    const targetArray = this.get(key);

    // ember handlebars can't use spread/rest syntax for actions yet
    // so we check if array is passed
    const unnestedValues = (isArray(values[0]) && values.length === 1) ? values[0] : values;

    // Loop and remove or push based on whether they're present in the array.
    unnestedValues.forEach((value) => {
      if (targetArray.includes(value)) {
        targetArray.removeObject(value);
      } else {
        targetArray.pushObject(value);
      }
    });

    this.set(key, targetArray.sort());
  }

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
      // this.recommendationOptions.notifyPropertyChange(option);
      this.recommendationOptions[option].notifyPropertyChange('actions');
      break;
    };
    this.recommendationOptions[selectedOptionCode].actions.addObject(projAction);
    // this.recommendationOptions.notifyPropertyChange(selectedOptionCode);
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
