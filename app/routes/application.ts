import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    const response = await fetch(
      '/.netlify/functions/ping',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const omg = await response.json();

    debugger;
  }
}
