import { BodyRequest, RequestHandler } from 'express';
import { CheckData } from '../../utilities/checkData';
import { Email } from './email.types';
import { Resend } from 'resend';
import { UnprocessableEntity } from '../../utilities/errors';
import envs from '../../utilities/envs';

const { RESEND_KEY } = envs;
const resend = new Resend(RESEND_KEY);

export const sendEmail: RequestHandler = async (req: BodyRequest<Email>, res) => {
  const { to, subject, content } = req.body;

  const checker = new CheckData();
  if (checker.size()) throw new UnprocessableEntity(checker.errors);

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: to,
    subject: subject,
    html: content
  })

  res.sendStatus(201);
}