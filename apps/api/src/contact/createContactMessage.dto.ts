import {
  Matches,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsUUID
} from 'class-validator';
import {
  PostContactMessage,
  customErrorCodes
} from '@wir-vs-virus/api-interfaces';
import { notHtmlRegExp } from '../common/utils';

export class CreateContactMessageDTO implements PostContactMessage {
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
  @Length(0, 1000)
  recaptcha: string;
}
