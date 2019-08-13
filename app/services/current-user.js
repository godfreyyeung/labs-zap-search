import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CurrentUserService extends Service {
  @service
  session;

  @service
  store;

  // If session is authenticated, uses the session's user id to
  // look up and return a PROMISE for the Ember Data Store's User object.
  @computed('session.{isAuthenticated,data.authenticated}')
  get user() {
    // TODO: query by email (this.session.data.authenticated.email)
    return this.store.findRecord('user', 2, {
      reload: true,
      include: 'userProjectParticipantTypes.project,projects',
    });
  }

  @computed('session.isAuthenticated')
  get isLoggedIn() {
    return this.session.isAuthenticated;
  }
};
