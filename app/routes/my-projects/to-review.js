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

export default class MyProjectsToReviewRoute extends Route {
  @service
  currentUser;

  @service
  store;

  async model() {
    // TODO: Retrieve projects here, instead of side-loading in currentUser service.
    const user = await this.currentUser.get('user');
    let userProjects = user.projects.filter((project) => {
      let includeProject = false;
      let userProjPartTypes = userProjectParticipantTypes(user, project);
      project.milestones.forEach((milestone) => {
        if((milestone.statusCode === 'In Progress')){
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
