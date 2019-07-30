import DS from 'ember-data';
const { Model } = DS;
import { attr, belongsTo } from '@ember-decorators/data';

export default class HearingModel extends Model {

@belongsTo('action') action;

@attr('boolean') isScheduled;

@attr('string', { defaultValue: '' }) location;

@attr('date') date;

}
