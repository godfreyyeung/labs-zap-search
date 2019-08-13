import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

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

  // the project is available through the model.

  // if the new recommendation applies to all actions
  allActions = true;

  approvedActions = [];
  approvedModificationsActions = [];
  disapprovedActions = [];
  disapprovedModificationsActions = [];

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
  submitRecommendation(recommendation) {
    if (allActions) {
      recommendation.actions = this.model.project.actions;
      recommendation.save();
    } else {

      for (let recommendationType of [approvedActions, approvedModificationsActions,
        disapprovedActions, disapprovedModificationsActions]) {
          console.log(recommendationType);
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
