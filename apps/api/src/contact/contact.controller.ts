import { Controller, Post, Body, Logger } from '@nestjs/common';
import { MailService } from '../services/mail/mail.service';
import { ContactMessage } from '@wir-vs-virus/api-interfaces';

@Controller('contact')
export class ContactController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendmail(@Body() msg: ContactMessage) {
    Logger.log(msg);
    // todo add id to each volunteer and search for id in mongo
    const recieverAddr = msg.recieverId;
    const res = await this.mailService.sendContactMail(
      msg.senderEmailAddr,
      recieverAddr,
      msg.message
    );
    Logger.debug(res[0].statusCode);

    return { success: res[0].statusCode === 202 };
  }
}
