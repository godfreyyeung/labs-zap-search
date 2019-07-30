import DS from 'ember-data';
const { Model } = DS;
import { attr, hasMany } from '@ember-decorators/data';

export default class UserModel extends Model {

@hasMany('project') projects;

@attr('string', { defaultValue: '' }) name;

@attr('string', { defaultValue: '' }) email; // need this?

// all affiliation variables --> lupteammemberrole? in dcp_projectlupteam
// not seeing this in data?
// assuming user has same affiliation across projects
//...but what is affiliation is project specific?
@attr('string', { defaultValue: '' }) typeOfAffiliation;

@attr('string', { defaultValue: '' }) affiliation;

@attr('string', { defaultValue: '' }) title;
}
