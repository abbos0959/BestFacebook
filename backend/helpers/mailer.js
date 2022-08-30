const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const outh_link = `https://developers.google.com/oauthplayground`;

const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFFRESH, MAILING_ACCESS } = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFFRESH, outh_link);

const sendverificationEmail = (email, name, url) => {
console.log("BU EMAILLLLLLLLLLLLLLLL", EMAIL);

   auth.setCredentials({
      refresh_token: MAILING_REFFRESH,
      
   });

   const accestoken = auth.getAccessToken();

   const stmp = nodemailer.createTransport({
      service: "gmail",
      auth: {
         type: "OAuth2",
         user: EMAIL,
         clientId: MAILING_ID,
         clientSecret: MAILING_SECRET,
         refreshToken: MAILING_REFFRESH,
         accestoken,
      },
   });

   const mailoptions = {
      from: EMAIL,
      to: email,
      subject: "facebok email verify",
      html: `<div style="display:flex;max-width:700px;margin-bottom:1rem;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img style="width:30px" src="../backend/assets/images/logo.png" alt=""><span>Active facebook your account</span></div><div style="padding:1rem 0;border-top:1p solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Salom ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Registratsiya bolish uchun siz accountingizni tasdiqlashingiz kerak</span></div><a style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600" href=${url}>Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Siz facebook orqali barcha dostlaringiz bilan aloqada bo'ling</span></div></div>`,
   };
   stmp.sendMail(mailoptions, (err, res) => {
      if (err) return err;
      return res;
   });
};

module.exports = sendverificationEmail;
