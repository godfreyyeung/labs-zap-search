import DS from 'ember-data';
import { attr, belongsTo } from '@ember-decorators/data';
const { Model } = DS;

export default class RecommendationModel extends Model {

// submittedBy? Can we assume a user is the submitter?
// can we assume this is singular?
// affiliationType from user?--assuming user has same affiliation across projects
//...but what is affiliation is project specific?
@belongsTo('user') user;

@attr('string', { defaultValue: '' }) formCompleterName;
@attr('string', { defaultValue: '' }) formCompleterTitle; // dcp_title from dcp_communityboarddisposition

// approve vs. disapprove?
@attr('string', { defaultValue: '' }) recommendation;

// extra notes on this? memo, dcp_consideration
@attr('string', { defaultValue: '' }) consideration;

// what exactly is this?
@attr('string', { defaultValue: '' }) voteLocation;

@attr('date') dateReceived;
@attr('date') dateVoted;
}
