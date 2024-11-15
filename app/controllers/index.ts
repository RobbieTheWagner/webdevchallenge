import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class IndexController extends Controller {
  @tracked friendsEmail = '';

  @task
  *referFriend() {
    if (this.friendsEmail) {
      try {
        const response = yield fetch(
          `https://blvckspades.netlify.app/.netlify/functions/refer?email=${encodeURIComponent(this.friendsEmail)}`,
          {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Allow-Origin': '*',
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        return yield response.json();
      } catch {}
    }
  }

  @task
  *unlockCard() {
    try {
      const response = yield fetch('/.netlify/functions/unlock-card', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return yield response.json();
    } catch {}
  }

  @action
  updateFriendsEmail(e: InputEvent) {
    this.friendsEmail = (e.target as HTMLInputElement).value;
  }
}
