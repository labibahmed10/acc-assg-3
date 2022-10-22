// WITH GMAIL
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

exports.sendMailWithGmail = async (data) => {
   const accessToken = await oAuth2Client.getAccessToken();

   let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         type: "OAuth2",
         user: process.env.SENDER_MAIL,
         clientId: process.env.CLIENT_ID,
         clientSecret: process.env.CLIENT_SECRET,
         refreshToken: process.env.REFRESH_TOKEN,
         accessToken: accessToken,
      },
   });

   const mailData = {
      from: process.env.SENDER_MAIL, // sender address
      to: data.to, // list of receivers
      subject: data.subject,
      text: data.text,
      // html: `<b>Hey there! </b>
      //    <br> This is our first message sent with Nodemailer<br/>`,
   };
   let info = await transporter.sendMail(mailData);

   return info.messageId;
};
