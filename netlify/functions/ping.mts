import type { Context } from '@netlify/functions';
import mailchimp from '@mailchimp/mailchimp_marketing';

export default async (req: Request, context: Context) => {
  const apiKey = Netlify.env.get('MAILCHIMP_API_KEY');
  mailchimp.setConfig({
    apiKey,
    server: 'us7',
  });
  const response = await mailchimp.ping.get();
  // const response = await fetch('https://us7.api.mailchimp.com/3.0/ping', {
  //   headers: {
  //     'Access-Control-Allow-Headers': '*',
  //     'Access-Control-Allow-Origin': '*',
  //     Authorization: `Bearer ${apiKey}`,
  //     'Content-Type': 'application/json',
  //   },
  // });

  return Response.json(response, {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
