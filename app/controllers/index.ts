import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class IndexController extends Controller {
  @tracked friendsEmail = '';

  @task
  *referFriend() {
    if (this.friendsEmail) {
      const response = yield fetch('/.netlify/functions/refer', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.friendsEmail }),
      });

      return yield response.json();
    }
  }

  @action
  updateFriendsEmail(e: InputEvent) {
    this.friendsEmail = (e.target as HTMLInputElement).value;
  }
}
