import DS from 'ember-data';
import { attr, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

export default class HearingModel extends Model {
  @belongsTo('action') action;

  @attr('boolean') isScheduled;

  @attr('string', { defaultValue: '' }) location;

  @attr('date') date;
}
