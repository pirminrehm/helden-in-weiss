import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
  Min,
  Max
} from 'class-validator';
import { PostVolunteer } from '@wir-vs-virus/api-interfaces';

export class CreateVolunteerDTO implements PostVolunteer {
  @IsString()
  @IsNotEmpty()
  @Length(3, 70)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @Min(10000)
  @Max(99999)
  zipcode: number;

  @IsPhoneNumber('DE')
  @IsNotEmpty()
  phone: string;

  @Length(0, 300)
  description: string;

  @IsArray()
  @MaxLength(30, {
    each: true
  })
  qualification: string[];

  @IsString()
  @Length(0, 1000)
  recaptcha: string;

  @IsBoolean()
  privacyAccepted: boolean;
}
