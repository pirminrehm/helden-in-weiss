import {
  Controller,
  Post,
  Body,
  Logger,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { MailService } from '../services/mail/mail.service';
import { customErrorCodes, ContactMessage } from '@wir-vs-virus/api-interfaces';
import { RecaptchaService } from '../services/recaptcha/recaptcha.service';
import { InstitutionService } from '../institution/institution.service';
import { uuidRegExp } from '../common/utils';
import { CreateContactMessageDTO } from './createContactMessage.dto';
import { VolunteerService } from '../volunteer/volunteer.service';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly institutionService: InstitutionService,
    private readonly volunteerService: VolunteerService,
    private readonly recaptchaService: RecaptchaService,
    private readonly mailService: MailService
  ) {}

  @Post('institution')
  async sendMessageToInstitution(@Body() message: CreateContactMessageDTO) {
    await this.validateCaptcha(message.recaptcha);

    const reciever = await this.institutionService.getInstitutionByPublicUuid(
      message.recieverId
    );
    await this.checkIfVoid(reciever);

    Logger.log('Send mail to institution: ' + message.recieverId);
    const res = await this.mailService.sendContactMail(
      message.senderEmailAddr,
      reciever.contact.email,
      message.message
    );
    Logger.log('Send mail status: ' + res[0].statusCode);

    return { success: res[0].statusCode === 202 };
  }

  @Post('volunteer')
  async sendMessageToVolunteer(@Body() message: CreateContactMessageDTO) {
    await this.validateCaptcha(message.recaptcha);

    const reciever = await this.volunteerService.getVolunteerByPublicUuid(
      message.recieverId
    );
    await this.checkIfVoid(reciever);

    Logger.log('Send mail to volunteer: ' + message.recieverId);
    const res = await this.mailService.sendContactMail(
      message.senderEmailAddr,
      reciever.email,
      message.message
    );
    Logger.log('Send mail status: ' + res[0].statusCode);

    return { success: res[0].statusCode === 202 };
  }

  async checkIfVoid(response: any) {
    if (!response) {
      throw new HttpException(
        customErrorCodes.CONTACT_NOT_FOUND,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async validateCaptcha(captcha) {
    const validation = await this.recaptchaService.validate(captcha);
    if (!validation.success) {
      Logger.warn(validation.message);
      throw new HttpException(
        customErrorCodes.CAPTCHA_NOT_FOUND,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
