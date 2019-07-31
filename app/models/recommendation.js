import DS from 'ember-data';
import { attr, belongsTo } from '@ember-decorators/data';

const { Model } = DS;

export default class RecommendationModel extends Model {
  @belongsTo('user') user;

  // Investigate: Are these necessary if there's already an associated user?
  @attr('string', { defaultValue: '' }) formCompleterName;

  @attr('string', { defaultValue: '' }) formCompleterTitle;

  // Investigate: approve vs. disapprove?
  @attr('string', { defaultValue: '' }) recommendation;

  // Investigate: extra notes on this? memo, dcp_consideration
  @attr('string', { defaultValue: '' }) consideration;

  // Investigate: what exactly is this?
  @attr('string', { defaultValue: '' }) voteLocation;

  @attr('date') dateReceived;

  @attr('date') dateVoted;
}
