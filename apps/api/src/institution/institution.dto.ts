import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  ValidateNested
} from 'class-validator';
import { PostInstitution } from '@wir-vs-virus/api-interfaces';

export class Contact {
  @IsString()
  @IsNotEmpty()
  @Length(3, 70)
  name: string;

  @IsPhoneNumber('DE')
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class Location {
  @Length(0, 300)
  type: string;

  @MaxLength(2, {
    each: true
  })
  coordinates: number[];
}

export class CreateInstitutionDTO implements PostInstitution {
  @IsString()
  @IsNotEmpty()
  @Length(3, 70)
  name: string;

  @IsNumber()
  @Min(10000)
  @Max(99999)
  zipcode: number;

  @Length(0, 300)
  description: string;

  @ValidateNested()
  @Type(() => Contact)
  contact: Contact;

  @IsBoolean()
  privacyAccepted: boolean;

  @IsString()
  @Length(0, 500)
  recaptcha: string;
}
