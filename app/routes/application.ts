import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    const response = await fetch(
      'https://blvckspades.netlify.app/.netlify/functions/ping',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return await response.json();
  }
}
