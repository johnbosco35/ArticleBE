/** @format */

import * as nodemailer from "nodemailer";
import { google } from "googleapis";
import { environmentVariable } from "../env/environmemt";

const GOOGLE_ID = environmentVariable.google_id;
const GOOGLE_SECRET = environmentVariable.google_secret;
const GOOGLE_REFRESHTOKEN = environmentVariable.google_refreshtoken;
const GOOGLE_REDIRECT = environmentVariable.google_redirect;
const accessTOKEN = environmentVariable.accessToken;

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

const transporter = nodemailer.createTransport({
  host: "gmail",
  auth: {
    type: "OAuth2",
    user: "okonkwovincent63@gmail.com",
    clientId: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    refreshToken: GOOGLE_REFRESHTOKEN,
    accessToken: accessTOKEN,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const Mailer = async (email, subject, text) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `<>noreply@gmail.com<>`, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
};

// main().catch(console.error);
