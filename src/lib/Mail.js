import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';

import dotenv from 'dotenv';

import mailConfig from '../config/mail';

dotenv.config({
  path: process.env.NODE_ENV !== 'production' ? '.env.development' : '.env',
});

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport(
      sesTransport({
        accessKeyId: process.env.MAIL_USER,
        secretAccessKey: process.env.MAIL_PASS,
      })
    );

    this.configureTemplates();
  }

  // TO DO
  configureTemplates() {}

  // Message object -> All the data expected from the template
  sendEmail(message) {
    return this.transporter.sendMail(
      {
        ...mailConfig.default,
        ...message,
      },
      (err, info) => {
        if (err) return console.log(err);

        return console.log(info);
      }
    );
  }
}

export default new Mail();
