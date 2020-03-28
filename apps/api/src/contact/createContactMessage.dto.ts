import {
  Matches,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsUUID
} from 'class-validator';
import { ContactMessage, customErrorCodes } from '@wir-vs-virus/api-interfaces';
import { uuidRegExp, notHtmlRegExp } from '../common/utils';

export class CreateContactMessageDTO implements ContactMessage {
  @IsNotEmpty()
  @IsUUID('4')
  recieverId: string;

  @IsNotEmpty()
  @IsEmail()
  senderEmailAddr: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 500)
  @Matches(notHtmlRegExp, {
    message: customErrorCodes.HTML_NOT_ALLOWED
  })
  message: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 500)
  recaptcha: string;
}
