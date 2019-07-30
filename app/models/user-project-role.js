import DS from 'ember-data';
import { attr, belongsTo } from '@ember-decorators/data';
const { Model } = DS;

export default class UserProjectRoleModel extends Model {

@belongsTo('project') projects;
@belongsTo('user') users;

@attr() affiliation;
@attr() role;

}
