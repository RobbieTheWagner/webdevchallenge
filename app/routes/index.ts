import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
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

    const result = await response.json();

    return {
      clubs: JSON.parse(result.merge_fields.CLUBS),
      diamonds: JSON.parse(result.merge_fields.DIAMONDS),
      hearts: JSON.parse(result.merge_fields.HEARTS),
      spades: JSON.parse(result.merge_fields.SPADES),
    };
  }
}
