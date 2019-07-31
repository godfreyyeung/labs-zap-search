import DS from 'ember-data';
import { attr, hasMany } from '@ember-decorators/data';

const { Model } = DS;

export default class UserModel extends Model {
  // user's internal id should be their email

  @hasMany('project') projects;

  // A user, particularly one representing the Borough President,
  // can have different roles for a single project.
  // A Borough President representative can have both a Borough President
  // and "Borough Board" role.
  @hasMany('userProjectParticipation') userProjectParticipation;

  // Borough President, Borough Board, Community Board 1 - 12
  // a.k.a. Affiliation
  // e.g. BXCB1, BXBB, BXBP, BXCB5
  @attr('string') participation;

  @attr('string', { defaultValue: '' }) name;

  @attr('string', { defaultValue: '' }) title;
}
