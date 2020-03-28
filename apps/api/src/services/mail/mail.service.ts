import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    if (!this.hostUrl) {
      Logger.error('HOST_URL not defined');
    }
    if (!process.env.SENDGRID_API_KEY) {
      Logger.error('SENDGRID_API_KEY not defined');
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  private hostUrl = process.env.HOST_URL || undefined;
  private matchHtmlRegExp = /(<.{1,30}?>)|<a href=".*?">/g;

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
      text: msgText.replace(/\<br\>/g, '\n'),
      html: msgText
    };

    return this.checkSendMailStatus(await sgMail.send(msg));
  }

  async sendRegistrationMail(
    name: string,
    recieverEmail: string,
    type: 'volunteer' | 'institution',
    uuid: string
  ): Promise<boolean> {
    const link = `https://${this.hostUrl}/validate?type=${type}&uuid=${uuid}`;
    const msgText = `
    Hallo ${name},<br>
    <br>
    vielen Dank für Ihre Hilfe!<br>
    Bitte klicken Sie auf folgenden Link um Ihre Angaben zu bestätigen:<br>
    <a href="${link}">${link}<a/><br>
    <br>
    Beste Grüße<br>
    Ihre Team von <b>Helden in Weiss</b>
    `;
    const msg = {
      to: recieverEmail,
      from: '"Helden in Weiss" <contact@helden-in-weiss.de>',
      subject: 'Registrierung abschließen bei Helden in Weiss',
      text: msgText.replace(/\<br\>/g, '\n').replace(this.matchHtmlRegExp, ' '),
      html: msgText
    };

    return this.checkSendMailStatus(await sgMail.send(msg));
  }

  checkSendMailStatus(response) {
    const isOk = response[0].statusCode === 202;
    Logger.log('Send mail status: ' + response[0].statusCode);
    if (!isOk) {
      Logger.error('Send mail problem:');
      Logger.error(response);
    }
    return isOk;
  }
}
