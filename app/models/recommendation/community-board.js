import RecommendationModel from '../recommendation';
import { attr } from '@ember-decorators/data';

export default class RecommendationCommunityBoardModel extends RecommendationModel {

@attr('number') votersInFavor;
@attr('number') votersAgainst;
@attr('number') votersAbstain;
@attr('number') totalBoardMembers;
@attr('boolean') didQuorumExist;
}
