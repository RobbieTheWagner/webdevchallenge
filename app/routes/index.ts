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
      clubs: JSON.parse(result.merge_fields.CLUBS.slice(1, -1)),
      diamonds: JSON.parse(result.merge_fields.DIAMONDS.slice(1, -1)),
      hearts: JSON.parse(result.merge_fields.HEARTS.slice(1, -1)),
      spades: JSON.parse(result.merge_fields.SPADES.slice(1, -1)),
    };
  }
}
