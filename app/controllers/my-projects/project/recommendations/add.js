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

  // --> DispositionModel.votinginfavorrecommendation
  votesInFavor = 0;

  // --> DispositionModel.votingagainstrecommendation
  votesAgainst = 0;

  // --> DispositionModel.votingabstainingonrecommendation
  votesAbstain = 0;

  // --> DispositionModel.totalmembersappointedtotheboard
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
    return Object.keys(this.recommendationOptions).map(key => this.recommendationOptions[key].label);
  }

  @action
  setProp(property, newVal) {
    this.set(property, newVal);
  }

  // For setting disposition recommendation, use the action
  // "setDispositionRecByPartType" instead.
  @action
  updateDispositionAttr(disposition, attrName, newVal) {
    disposition.set(attrName, newVal);
  }

  /**
 * @param { Disposition } disposition
 * @param { String } recommendation
 * @param { String } participantType (optional)
 * assigns the `recommendation` string to either the `
 * TODO: Update this to rely on the disposition.participantType field
 * when it is implemented in the ZAP-API.
 */
  @action
  setDispositionRecByPartType (disposition, recommendation) {
    const partType = this.participantType;
    let recommendationFieldName = '';
    if (partType === 'CB') {
      recommendationFieldName = 'communityboardrecommendation';
    } else if (partType === 'BB') {
      recommendationFieldName = 'boroughboardrecommendation';
    } else if (partType === 'BP') {
      recommendationFieldName = 'boroughpresidentrecommendation';
    } else {
      return false;
    }
    disposition.set(recommendationFieldName, recommendation);
    return true;
  }

  @action
  setHearingDate() {
    return true;
  }

  @action
  submitRecommendations() {
  }
}
