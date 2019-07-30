import DS from 'ember-data';
const { Model } = DS;
import { attr, hasMany, belongsTo } from '@ember-decorators/data';

export default class ActionModel extends Model {

// actionCode?
// other attributes for actions?
// dcp_name (name of action)
// statuscode (status of action)
// dcp_ulurpnumber (ulurp number for action)
// dcp_ActionType--> actionType (what does this mean?)
// action code? 
// unique id? dcp_actionid --> actionId
@belongsTo('project') project;
@belongsTo('hearing') hearing;
@hasMany('recommendation') recommendations;
}

