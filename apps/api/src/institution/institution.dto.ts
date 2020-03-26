import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  ValidateNested
} from 'class-validator';

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

export class Institution {
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

  @IsString()
  @Length(0, 500)
  recaptcha: string;

  @ValidateNested()
  @Type(() => Contact)
  contact: Contact;

  @ValidateNested()
  @Type(() => Location)
  location?: Location;

  @IsBoolean()
  privacyAccepted: boolean;

  @IsString()
  @IsOptional()
  city?: string;
}
