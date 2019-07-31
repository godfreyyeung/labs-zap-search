import { attr } from '@ember-decorators/data';
import RecommendationModel from '../recommendation';

export default class RecommendationCommunityBoardModel extends RecommendationModel {
  @attr('number') votesInFavor;

  @attr('number') votesAgainst;

  @attr('number') votesAbstain;

  @attr('number') totalBoardMembers;

  @attr('boolean') didQuorumExist;
}
