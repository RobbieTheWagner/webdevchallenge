import type { Context } from '@netlify/functions';
import mailchimp from '@mailchimp/mailchimp_marketing';

export default async (req: Request, context: Context) => {
  const email = new URL(req.url).searchParams.get('email');
  const apiKey = Netlify.env.get('MAILCHIMP_API_KEY');
  mailchimp.setConfig({
    apiKey,
    server: 'us7',
  });

  return mailchimp.lists.addListMember('540898', {
    email_address: email,
    status: 'pending',
  });
};
