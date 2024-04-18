import envs from './envs';
import nodemailer from 'nodemailer';

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = envs;
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD
    }
});

export const sendEmail = async (body: EmailBody) => {
    const { to, subject, content } = body;

    transporter.sendMail({
        from: NODEMAILER_EMAIL,
        to,
        subject,
        html: content
    });
};

export type EmailBody = {
    to: string;
    subject: string;
    content: string;
};
