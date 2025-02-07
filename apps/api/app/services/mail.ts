import sgMail  from "@sendgrid/mail";
import * as Handlebars from "handlebars";
import { prisma, User } from '@ararog/odonto-chat-db'

import { generateToken } from "@/helpers/token";
import { emailVerifyTemplate } from "@/templates/email/email-verify";
import { forgotPasswordTemplate } from "@/templates/email/forgot-password";
import { DAY_IN_MILLISECONDS, HOUR_IN_MILLISECONDS } from "@/helpers/contants";

const sendMail = async (to: string, subject: string, content: unknown, htmlTemplate: string ) => {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY is not set");
  }

  const template = Handlebars.compile(htmlTemplate);

  const html = template(content);

  sgMail.setApiKey(apiKey);

  const msg = {
    to: to,
    from: 'rogerio.araujo@gmail.com',
    subject: subject,
    html: html
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

const sendVerificationMail = async (user: User) => {
  const token = generateToken(8);

  await prisma.verificationToken.create({
    data: {
      token,
      userId: user.id!,
      expires: new Date(Date.now() + DAY_IN_MILLISECONDS)
    }
  });

  const content = {
    title: "E-mail Verification", 
    message: "Please enter the following code to verify your e-mail:", 
    token
  };

  await sendMail(user.email!, "E-mail Verification", content, emailVerifyTemplate);
};

const sendResetPasswordMail = async (user: User) => {
  const token = generateToken(8);

  await prisma.verificationToken.create({
    data: {
      token,
      userId: user.id!,
      expires: new Date(Date.now() + HOUR_IN_MILLISECONDS)
    }
  });

  const url = `${process.env.PUBLIC_APP_URL}/password/reset?userId=${user.id}&token=${token}`;

  const content = {title: "Reset your password", message: "Click link below to reset your password", url};

  await sendMail(user.email!, "Reset Password", content, forgotPasswordTemplate);
};

export { sendVerificationMail, sendResetPasswordMail };

