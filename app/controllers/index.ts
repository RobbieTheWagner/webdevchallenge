import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

export default class IndexController extends Controller {
  @tracked friendsEmail = '';

  @task
  *referFriend() {
    if (this.friendsEmail) {
      const response = yield fetch(
        `/.netlify/functions/refer?email=${encodeURIComponent(this.friendsEmail)}`,
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
    }
  }

  @action
  updateFriendsEmail(e: InputEvent) {
    this.friendsEmail = (e.target as HTMLInputElement).value;
  }
}
