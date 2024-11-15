import type { Context } from '@netlify/functions';
import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';

export default async (req: Request, context: Context) => {
  const email = 'notreal@whiskey.fm';
  const apiKey = Netlify.env.get('MAILCHIMP_API_KEY');
  mailchimp.setConfig({
    apiKey,
    server: 'us7',
  });

  return mailchimp.lists.getListMember('540898', md5(email.toLowerCase()));
};
