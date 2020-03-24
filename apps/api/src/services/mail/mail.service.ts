import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  sendContactMail(
    senderAddr: string,
    recieverAddr: string,
    messageText: string
  ) {
    const msgText = `Folgende Nachricht wird dir von ${senderAddr} geschickt: <br><br>${messageText}`;
    const msg = {
      to: recieverAddr,
      from: senderAddr,
      subject: 'Kontaktaufnahme über Helden in Weiß',
      text: msgText.replace(/\<br\>/g, ''),
      html: msgText
    };
    return sgMail.send(msg);
  }
}
