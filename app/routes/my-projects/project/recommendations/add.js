import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class MyProjectsProjectRecommendationsAddRoute extends Route {
  // Depends on the my-project/project route already loading a project
  // with side-loaded actions

  model() {
    return this.modelFor('my-projects.project');
  }

  @action
  error() {
    this.transitionTo('not-found', 'not-found');
  }
}
