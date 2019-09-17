import Controller from '@ember/controller';
import EmberObject, { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

class RecommendationOption extends EmberObject {
  label = '';

  code = '';
}

class DispositionForAllActions extends EmberObject {
  // the selected recommendation option if applying filled Recommendation
  // to all actions
  recommendation = '';

  votesInFavor = 0;

  votesAgainst = 0;

  votesAbstain = 0;

  votesTotalMembers = 0;

  voteLocation = '';

  voteDate = '';

  comment = '';
}

export default class MyProjectsProjectRecommendationsAddController extends Controller {
  queryParams = ['participantType'];

  @service
  store;

  @service
  currentUser;

  // the project is available through the model.
  @alias('model')
  project;

  // if user wishes to apply the same recommendation values to all dispositions
  submitOneRec = undefined;

  dispositionForAllActions = DispositionForAllActions.create();

  recommendationOptions = EmberObject.create({
    approved: RecommendationOption.create({
      label: 'Approved',
      code: 'approved',
    }),
    'approved-with-modifications-conditions': RecommendationOption.create({
      label: 'Approved with Modifications/Conditions',
      code: 'approved-with-modifications-conditions',
    }),
    disapproved: RecommendationOption.create({
      label: 'Disapproved',
      code: 'disapproved',
    }),
    'disapproved-with-modifications-conditions': RecommendationOption.create({
      label: 'Disapproved with Modifications/Conditions',
      code: 'disapproved-with-modifications-conditions',
    }),
    'not-available': RecommendationOption.create({
      label: 'N/A',
      code: 'not-available',
    }),
  });

  @computed('recommendationOptions')
  get recOptions() {
    return Object.keys(this.recommendationOptions).map((key) => {
      return this.recommendationOptions[key].label;
    });
  }

  @action
  setProp(property, newVal) {
    this.set(property, newVal);
  }

  @action
  updateDispositionAttr(disposition, attrName, newVal) {
    disposition.set(attrName, newVal);
  }

  @action
  setHearingDate() {
    return true;
  }

  @action
  submitRecommendations() {
    // TODO:When disposition.participantType is available from ZAP-API,
    // use disposition.participantType to determine which 
    // <participantType>recommendation field to write the recommendation to. 
  }
}
