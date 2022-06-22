import Mailgun from 'mailgun-js';

const apiKey = process.env.MAILGUNAPIKEY;
const domain = process.env.DOMAIN;
export const sendMail = new Mailgun({ apiKey, domain });
