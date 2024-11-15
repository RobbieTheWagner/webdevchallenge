import mailchimp from '@mailchimp/mailchimp_marketing';
import type { Context } from '@netlify/functions';

const MAILCHIMP_API_KEY = 'e3ba0bbb3ca8b87ce5d3ddf3c5c1f577-us7';

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: 'us7',
});

export default async (req: Request, context: Context) => {
  const response = await mailchimp.ping.get();
  return new Response(response);
};
