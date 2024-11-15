import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    await fetch('https://blvckspades.netlify.app/.netlify/functions/ping');
  }
}
