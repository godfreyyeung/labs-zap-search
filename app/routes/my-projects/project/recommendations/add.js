import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class MyProjectsProjectRecommendationsAddRoute extends Route {
  // Model must be passed from the source route using a link-to helper.
  // Model must contain a project (with side-loaded actions) and a recommendation.

  @action
  error() {
    this.transitionTo('not-found', 'not-found');
  }
}
