const NUM_CB_USER_PROJECTS = 7;
const NUM_BP_USER_PROJECTS = 4;

const REVIEW_SESSION_CERTIFIED_REFERRED_MILESTONE_ID = "8E3BEEC4-DAD0-E711-8116-1458D04E2FB8";

const COMMUNITY_BOARD_REFERRAL_MILESTONE_ID          = "923BEEC4-DAD0-E711-8116-1458D04E2FB8";
const BOROUGH_PRESIDENT_REFERRAL_MILESTONE_ID        = "963BEEC4-DAD0-E711-8116-1458D04E2FB8";
// const BOROUGH_BOARD_REFERRAL_MILESTONE_ID            = "943BEEC4-DAD0-E711-8116-1458D04E2FB8";

const CITY_COUNCIL_REVIEW_MILESTONE_ID = "A63BEEC4-DAD0-E711-8116-1458D04E2FB8";
const FINAL_LETTER_SENT_MILESTONE_ID   = "AA3BEEC4-DAD0-E711-8116-1458D04E2FB8";

export default function(server) {

  const seedCBUser = server.create('user', {
    id: 1,
    email: 'qncb5@planning.nyc.gov',
    landUseParticipant: 'QNCB5',
  });

  const seedCBUserProjects = server.createList('project', NUM_CB_USER_PROJECTS);
  seedCBUser.projects = seedCBUserProjects;

  const seedBPUser = server.create('user', {
    id: 2,
    email: 'bxbp@planning.nyc.gov',
    landUseParticipant: 'BXBP',
  });
  const seedBPUserProjects = server.createList('project', NUM_BP_USER_PROJECTS);
  seedBPUser.projects = seedBPUserProjects;

  for (let i = 0; i < NUM_CB_USER_PROJECTS; i++) {
    server.create('userProjectParticipantType', {
      user: seedCBUser,
      project: seedCBUserProjects[i],
      participantType: 'CB',
    });
  };

  /** Seed UserProjectParticipantType */
  server.create('userProjectParticipantType', {
    user: seedBPUser,
    project: seedBPUserProjects[0],
    participantType: 'BB',
  });

  server.create('userProjectParticipantType', {
    user: seedBPUser,
    project: seedBPUserProjects[0],
    participantType: 'BP',
  });

  server.create('userProjectParticipantType', {
    user: seedBPUser,
    project: seedBPUserProjects[1],
    participantType: 'BP',
  });

  server.create('userProjectParticipantType', {
    user: seedBPUser,
    project: seedBPUserProjects[2],
    participantType: 'BP',
  });

  server.create('userProjectParticipantType', {
    user: seedBPUser,
    project: seedBPUserProjects[3],
    participantType: 'BB',
  });

  /** Milestones **/
  // For a CB participantType.... 
  // - Projects in the "Upcoming" bin to milestone
  server.create('milestone' , {
    project: seedCBUserProjects[0],
    milestoneId: REVIEW_SESSION_CERTIFIED_REFERRED_MILESTONE_ID,
    name: 'ZC - Land Use Fee Payment ',
    milestoneName: 'Land Use Fee Payment',
    plannedStartDate: '2018-10-31T01:21:46',
    plannedCompletionDate: '2018-11-02T01:21:46',
    actualStartDate: null,
    actualEndDate: null,
    statusCode: 'Completed',
    milestoneSequence: 28,
    displayName: 'Land Use Fee Payment',
    displayDate: '2018-10-31T01:21:46',
    displayDate2: null,
  });

  // This milestone is what makes seedCBUserProjects[0] "Upcoming"
  server.create('milestone' , {
    project: seedCBUserProjects[0],
    milestoneId: COMMUNITY_BOARD_REFERRAL_MILESTONE_ID,
    name: 'ZC - Community Board Referral',
    milestoneName: 'Community Board Referral',
    displayName: 'Community Board Referral',
    plannedStartDate: '2018-10-31T01:21:46',
    plannedCompletionDate: '2018-11-02T01:21:46',
    actualStartDate: null,
    actualEndDate: null,
    statusCode: 'Not Started',
    milestoneSequence: 28,
    displayDate: '2018-10-31T01:21:46',
    displayDate2: null,
  });

  server.create('milestone' , {
    project: seedCBUserProjects[1],
    milestoneId: REVIEW_SESSION_CERTIFIED_REFERRED_MILESTONE_ID,
    name: 'ZC - Land Use Application Filed Review ',
    milestoneName: 'Land Use Application Filed Review',
    plannedStartDate: '2018-11-03T01:21:46',
    plannedCompletionDate: '2018-12-03T02:21:46',
    actualStartDate: null,
    actualEndDate: null,
    statusCode: 'Overridden',
    milestoneSequence: 29,
    displayName: 'Land Use Application Filed Review',
    displayDate: '2018-11-03T01:21:46',
    displayDate2: null,
  });

  // This milestone is what makes seedCBUserProjects[1] "Upcoming"
  server.create('milestone' , {
    project: seedCBUserProjects[1],
    milestoneId: COMMUNITY_BOARD_REFERRAL_MILESTONE_ID,
    name: 'ZC - Community Board Referral',
    milestoneName: 'Community Board Referral',
    displayName: 'Community Board Referral',
    plannedStartDate: '2018-10-31T01:21:46',
    plannedCompletionDate: '2018-11-02T01:21:46',
    actualStartDate: null,
    actualEndDate: null,
    statusCode: 'Not Started',
    milestoneSequence: 28,
    displayDate: '2018-10-31T01:21:46',
    displayDate2: null,
  });

  // - Projects in the "To Review" bin
  server.create('milestone' , {
    project: seedCBUserProjects[2],
    milestoneId: COMMUNITY_BOARD_REFERRAL_MILESTONE_ID,
    name: 'ZC - Community Board Referral',
    milestoneName: 'Community Board Referral',
    displayName: 'Community Board Referral',
    plannedStartDate: '2018-08-15T01:21:46',
    plannedCompletionDate: '2018-10-15T01:21:46',
    actualStartDate: '2018-08-15T01:21:46',
    actualEndDate: null,
    statusCode: 'In Progress',
    milestoneSequence: 36,
    displayDate: '2018-08-15T01:21:46',
    displayDate2: null,
  });

  server.create('milestone' , {
    project: seedCBUserProjects[3],
    milestoneId: COMMUNITY_BOARD_REFERRAL_MILESTONE_ID,
    name: 'ZC - Community Board Referral',
    milestoneName: 'Community Board Referral',
    displayName: 'Community Board Referral',
    plannedStartDate: '2018-08-15T01:21:46',
    plannedCompletionDate: '2018-10-15T01:21:46',
    actualStartDate: '2018-08-15T01:21:46',
    actualEndDate: null,
    statusCode: 'In Progress',
    milestoneSequence: 36,
    displayDate: '2018-08-15T01:21:46',
    displayDate2: null,
  });

  server.create('milestone' , {
    project: seedCBUserProjects[4],
    milestoneId: COMMUNITY_BOARD_REFERRAL_MILESTONE_ID,
    name: 'ZC - Community Board Referral',
    milestoneName: 'Community Board Referral',
    displayName: 'Community Board Referral',
    plannedStartDate: '2018-08-15T01:21:46',
    plannedCompletionDate: '2018-10-15T01:21:46',
    actualStartDate: '2018-08-15T01:21:46',
    actualEndDate: null,
    statusCode: 'In Progress',
    milestoneSequence: 36,
    displayDate: '2018-08-15T01:21:46',
    displayDate2: null,
  });

  // - Projects in the "Reviewed" bin 
  server.create('milestone' , {
    project: seedCBUserProjects[5],
    milestoneId: CITY_COUNCIL_REVIEW_MILESTONE_ID,
    name: 'ZC - City Council Review ',
    milestoneName: 'City Council Review',
    plannedStartDate: null,
    plannedCompletionDate: null,
    actualStartDate: '2016-04-22T01:40:24',
    actualEndDate: '2022-05-02T01:40:24',
    statusCode: 'Not Started',
    milestoneSequence: 60,
    displayName: 'City Council Review',
    displayDate: null,
    displayDate2: null,
  });

  // This milestone is what makes seedCBUserProjects[0] "Reviewed"
  server.create('milestone' , {
    project: seedCBUserProjects[5],
    milestoneId: COMMUNITY_BOARD_REFERRAL_MILESTONE_ID,
    name: 'ZC - Community Board Referral',
    milestoneName: 'Community Board Referral',
    displayName: 'Community Board Referral',
    plannedStartDate: '2018-10-31T01:21:46',
    plannedCompletionDate: '2018-11-02T01:21:46',
    actualStartDate: null,
    actualEndDate: null,
    statusCode: 'Completed',
    milestoneSequence: 28,
    displayDate: '2018-10-31T01:21:46',
    displayDate2: null,
  });

  server.create('milestone' , {
    project: seedCBUserProjects[6],
    milestoneId: FINAL_LETTER_SENT_MILESTONE_ID,
    name: 'ZC - Final Letter Sent ',
    milestoneName: 'Final Letter Sent',
    plannedStartDate: '2018-04-22T01:40:24',
    plannedCompletionDate: '2018-05-02T01:40:24',
    actualStartDate: null,
    actualEndDate: null,
    statusCode: 'Not Started',
    milestoneSequence: 60,
    displayName: 'Final Letter Sent',
    displayDate: null,
    displayDate2: null,
  });

  // This milestone is what makes seedCBUserProjects[0] "Reviewed"
  server.create('milestone' , {
    project: seedCBUserProjects[6],
    milestoneId: COMMUNITY_BOARD_REFERRAL_MILESTONE_ID,
    name: 'ZC - Community Board Referral',
    milestoneName: 'Community Board Referral',
    displayName: 'Community Board Referral',
    plannedStartDate: '2018-10-31T01:21:46',
    plannedCompletionDate: '2018-11-02T01:21:46',
    actualStartDate: null,
    actualEndDate: null,
    statusCode: 'Completed',
    milestoneSequence: 28,
    displayDate: '2018-10-31T01:21:46',
    displayDate2: null,
  });

  // For a BP participantType.... 
  // - BP Projects in the "Upcoming" bin to milestone
  server.create('milestone' , {
    project: seedBPUserProjects[0],
    milestoneId: REVIEW_SESSION_CERTIFIED_REFERRED_MILESTONE_ID,
    name: 'ZC - Land Use Fee Payment ',
    milestoneName: 'Land Use Fee Payment',
    plannedStartDate: '2018-10-31T01:21:46',
    plannedCompletionDate: '2018-11-02T01:21:46',
    actualStartDate: null,
    actualEndDate: null,
    statusCode: 'Completed',
    milestoneSequence: 28,
    displayName: 'Land Use Fee Payment',
    displayDate: '2018-10-31T01:21:46',
    displayDate2: null,
  });
  // - BP Projects in the "To Review" bin
  server.create('milestone' , {
    project: seedBPUserProjects[1],
    milestoneId: BOROUGH_PRESIDENT_REFERRAL_MILESTONE_ID,
    name: 'ZC - Borough President Referral',
    milestoneName: 'Borough President Referral',
    plannedStartDate: '2018-08-15T01:21:46',
    plannedCompletionDate: '2018-10-15T01:21:46',
    actualStartDate: '2018-08-15T01:21:46',
    actualEndDate: null,
    statusCode: 'In Progress',
    milestoneSequence: 36,
    displayName: 'Borough President Referral',
    displayDate: '2018-08-15T01:21:46',
    displayDate2: null,
  });

  server.create('milestone' , {
    project: seedBPUserProjects[2],
    milestoneId: BOROUGH_PRESIDENT_REFERRAL_MILESTONE_ID,
    name: 'ZC - Borough President Referral',
    milestoneName: 'Borough President Referral',
    plannedStartDate: '2018-08-15T01:21:46',
    plannedCompletionDate: '2018-10-15T01:21:46',
    actualStartDate: '2018-08-15T01:21:46',
    actualEndDate: null,
    statusCode: 'In Progress',
    milestoneSequence: 36,
    displayName: 'Borough President Referral',
    displayDate: '2018-08-15T01:21:46',
    displayDate2: null,
  });

  // - Projects in the "Reviewed" bin 
  server.create('milestone' , {
    project: seedBPUserProjects[3],
    milestoneId: CITY_COUNCIL_REVIEW_MILESTONE_ID,
    name: 'ZC - City Council Review ',
    milestoneName: 'City Council Review',
    plannedStartDate: null,
    plannedCompletionDate: null,
    actualStartDate: '2016-04-22T01:40:24',
    actualEndDate: '2022-05-02T01:40:24',
    statusCode: 'Not Started',
    milestoneSequence: 60,
    displayName: 'City Council Review',
    displayDate: null,
    displayDate2: null,
  });
}
