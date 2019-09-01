import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

// TODO: Refactor these constants into a service or helper
const COMMUNITY_BOARD_REFERRAL_MILESTONE_ID   = "923BEEC4-DAD0-E711-8116-1458D04E2FB8";
const BOROUGH_PRESIDENT_REFERRAL_MILESTONE_ID = "963BEEC4-DAD0-E711-8116-1458D04E2FB8";
const BOROUGH_BOARD_REFERRAL_MILESTONE_ID     = "943BEEC4-DAD0-E711-8116-1458D04E2FB8";

const MILESTONE_ID_LOOKUP = {
  'CB': COMMUNITY_BOARD_REFERRAL_MILESTONE_ID, 
  'BP': BOROUGH_PRESIDENT_REFERRAL_MILESTONE_ID, 
  'BB': BOROUGH_BOARD_REFERRAL_MILESTONE_ID,
}

const UPCOMING_MILESTONE_STATUSCODE = 'Not Started';

/**
 * 
 * @param {User Model Instance} user - must have userProjectParticipantTypes side-loaded
 * @param {Project Model Instance} project
 * TODO: Refactor this into a helper
 */
function userProjectParticipantTypes(user, project) {
  if (user && project) {
    const filteredPartTypes = user.get('userProjectParticipantTypes').filterBy('project.id', project.get('id'));
    const partTypesList = filteredPartTypes.map(value => value.get('participantType'));
    return partTypesList;
  }
  return [];
}

export default class MyProjectsUpcomingRoute extends Route {
  @service
  currentUser;

  @service
  store;

  // This route loads the user's projects according to their milestones and associated userProjectParticipantTypes.
  // Specifically, a given user's project only shows up here if it has an active "Review" (a.k.a. "Referral") milestone
  // that matches one of the project's -- and the current user's -- associated userProjectParticipantTypes.
  // For example, for a Borough President user, a project shows up here if it has an active Borough President Referral milestone.
  async model() {
    // TODO: Retrieve projects here, instead of side-loading in currentUser service.
    const user = await this.currentUser.get('user');
    let userProjects = user.projects.filter((project) => {
      let includeProject = false;
      let userProjPartTypes = userProjectParticipantTypes(user, project);
      // TODO: refactor away from forEach();
      project.milestones.forEach((milestone) => {
        if((milestone.statusCode === UPCOMING_MILESTONE_STATUSCODE)){
          userProjPartTypes.forEach((partType) => {
            let partTypeMilestoneId = MILESTONE_ID_LOOKUP[partType];
            if ((milestone.milestoneId === partTypeMilestoneId)) {
              includeProject = true;
            }
          });
        }
      });
      return includeProject;
    });
    return userProjects;
  }
}
