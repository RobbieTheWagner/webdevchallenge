import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    const response = await fetch(
      'https://blvckspades.netlify.app/.netlify/functions/cards',
      {
        headers: {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return await response.json();
  }
}
