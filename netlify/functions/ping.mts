import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  const apiKey = Netlify.env.get('MAILCHIMP_API_KEY');
  const response = await fetch('https://us7.api.mailchimp.com/3.0/ping', {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  return Response.json(result, {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
