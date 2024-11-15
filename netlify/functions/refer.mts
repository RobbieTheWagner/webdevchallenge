import type { Context } from '@netlify/functions';
import mailchimp from '@mailchimp/mailchimp_marketing';

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    const res = new Response();

    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.append('Access-Control-Allow-Headers', '*');
    res.headers.append('Access-Control-Allow-Methods', '*');

    return res;
  }

  const email = new URL(req.url).searchParams.get('email');
  if (email) {
    const apiKey = Netlify.env.get('MAILCHIMP_API_KEY');
    mailchimp.setConfig({
      apiKey,
      server: 'us7',
    });

    const response = await mailchimp.lists.addListMember('d3be14a71c', {
      email_address: decodeURIComponent(email),
      status: 'subscribed',
    });

    return Response.json(response, {
      headers: {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
};
