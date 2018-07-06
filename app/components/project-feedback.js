import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import { run } from '@ember/runloop';
import fetch from 'fetch';
import ENV from 'labs-zap-search/config/environment';

export default class ProjectFeedbackComponent extends Component {
  @argument
  project

  flagText = '';
  flagClosed = true;
  flagSuccess = false;
  reCaptchaResponse = null;

  @action
  handleFlagOpen() {
    this.set('flagClosed', false);
  }

  @action
  handleFlagClose() {
    this.set('flagClosed', true);
    // this.set('copySuccess', false);
  }

  @action
  onCaptchaResolved(reCaptchaResponse) {
    this.set('reCaptchaResponse', reCaptchaResponse);
  }

  @action
  async submitFlag() {
    const projectname = this.get('project.dcp_projectname');
    const projectid = this.get('project.dcp_name');
    const flagText = this.get('flagText');
    const reCaptchaResponse = this.get('reCaptchaResponse');

    const { status } = await fetch(`${ENV.host}/projects/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectname,
        projectid,
        text: flagText,
        'g-recaptcha-response': reCaptchaResponse,
      }),
    }).then(res => res.json());

    if (status === 'success' && !this.get('isDestroyed')) {
      this.set('flagSuccess', true);
      run.later(() => {
        if (!this.get('isDestroyed')) {
          this.setProperties({
            flagSuccess: false,
            flagText: '',
            flagClosed: true,
            reCaptchaResponse: null,
          });
        }
      }, 2000);
    }
  }
}
