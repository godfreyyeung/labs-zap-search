import DS from 'ember-data';
import { attr, hasMany, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

export default class ActionModel extends Model {
  // id should be sourced from dcp_actionid

  @belongsTo('project') project;

  @belongsTo('hearing') hearing;

  @hasMany('recommendation') recommendations;

  // The fields below seem reasonable, so adding them all for now.

  // Name of action.
  // sourced from dcp_name
  @attr('string') name;

  // sourced from dcp_statecode
  @attr('string ') status;

  // sourced from dcp_statuscode
  // Metadata claimed that dcp_statuscode mapped to "status reason"
  @attr('string') reason;

  @attr('string') ulurpNumber;

  // sourced from dcp_ActionType.
  // what does this mean?
  @attr('string') actionType;
}
