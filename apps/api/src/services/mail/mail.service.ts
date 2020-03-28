import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendContactMail(
    senderAddr: string,
    recieverAddr: string,
    messageText: string
  ): Promise<boolean> {
    const msgText = `Folgende Nachricht wird dir von ${senderAddr} geschickt:
      <br><br>${messageText.replace(/[\n]/g, '<br>')}`;
    const msg = {
      to: recieverAddr,
      from: '"Helden in Weiss" <noreply@helden-in-weiss.de>',
      replyTo: senderAddr,
      subject: 'Kontaktaufnahme über Helden in Weiss',
      text: msgText.replace(/\<br\>/g, ''),
      html: msgText
    };
    const response = await sgMail.send(msg);
    Logger.log('Send mail status: ' + response[0].statusCode);
    return response[0].statusCode === 202;
  }
}
