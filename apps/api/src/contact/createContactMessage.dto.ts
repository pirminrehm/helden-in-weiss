import {
  Matches,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail
} from 'class-validator';
import { ContactMessage } from '@wir-vs-virus/api-interfaces';
import { uuidRegExp } from '../common/utils';

export class CreateContactMessageDTO implements ContactMessage {
  @IsNotEmpty()
  @Matches(uuidRegExp)
  recieverId: string;

  @IsNotEmpty()
  @IsEmail()
  senderEmailAddr: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 500)
  message: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 500)
  recaptcha: string;
}
