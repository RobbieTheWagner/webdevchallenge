import type { Context } from '@netlify/functions';
import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    const res = new Response();

    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.append('Access-Control-Allow-Headers', '*');
    res.headers.append('Access-Control-Allow-Methods', '*');

    return res;
  }
  const apiKey = Netlify.env.get('MAILCHIMP_API_KEY');
  const email = 'notreal@whiskey.fm';
  mailchimp.setConfig({
    apiKey,
    server: 'us7',
  });

  const response = await fetch(
    'https://blvckspades.netlify.app/.netlify/functions/cards',
    {
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  const result = await response.json();

  const cards = {
    clubs: JSON.parse(result.merge_fields.CLUBS.slice(1, -1)),
    diamonds: JSON.parse(result.merge_fields.DIAMONDS.slice(1, -1)),
    hearts: JSON.parse(result.merge_fields.HEARTS.slice(1, -1)),
    spades: JSON.parse(result.merge_fields.SPADES.slice(1, -1)),
  };

  for (const suit in cards) {
    for (const card in cards[suit]) {
      if (cards[suit][card] === false) {
        cards[suit][card] = true;
        break;
      }
    }
  }

  const updateCardsResponse = await mailchimp.lists.updateListMember(
    'd3be14a71c',
    md5(email.toLowerCase()),
    {
      CLUBS: JSON.stringify(cards.clubs),
      DIAMONDS: JSON.stringify(cards.diamonds),
      HEARTS: JSON.stringify(cards.hearts),
      SPADES: JSON.stringify(cards.spades),
    },
  );

  return Response.json(updateCardsResponse, {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
