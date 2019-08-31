import DS from 'ember-data';
const {
  Model, attr, belongsTo,
} = DS;

// "-->" indicates which CRM field the Model attribute maps to.
export default class MilestoneModel extends Model {
  @belongsTo('project') project;

  // --> dcp_projectmilestone. e.g. 923BEEC4-DAD0-E711-8116-1458D04E2FB8
  // This is the Milestone ID that identifies a specific milestone
  @attr('string') milestoneId;

  // --> dcp_name. e.g. 'ZC - Land Use Fee Payment '
  @attr('string') name;

  // --> milestonename | e.g. 'Land Use Fee Payment'
  @attr('string') milestoneName;

  // --> dcp_plannedstartdate | e.g. '2018-10-31T01:21:46'
  @attr('string') plannedStartDate;

  // --> dcp_plannedcompletiondate | e.g. '2018-11-02T01:21:46'
  @attr('string') plannedCompletionDate;

  // --> dcp_actualstartdate | e.g. '2018-05-11T04:00:00'
  @attr('string') actualStartDate;

  // --> dcp_actualenddate | e.g. '2018-05-12T04:00:00'
  @attr('string') actualEndDate;

  // --> statuscode | e.g. 'Not Started', 'In Progress', 'Completed', 'Overridden'
  @attr('string') statusCode;

  // --> dcp_milestonesequence | e.g. 28
  @attr('string') milestoneSequence;

  // --> display_name | e.g. 'Land Use Fee Payment'
  @attr('string') displayName;

  // --> display_date | e.g. '2018-10-31T01:21:46'
  @attr('string') displayDate;

  // --> display_date_2 | e.g. null
  @attr('string') displayDate2;
};
