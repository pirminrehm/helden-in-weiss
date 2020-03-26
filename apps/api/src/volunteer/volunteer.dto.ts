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
  ValidateNested,
  Min,
  Max
} from 'class-validator';

export class Location {
  @Length(0, 300)
  type: string;

  @MaxLength(2, {
    each: true
  })
  coordinates: number[];
}

export class Volunteer {
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

  @ValidateNested()
  location?: Location;

  @IsBoolean()
  active?: boolean;

  @IsDateString()
  registeredAt?: string;

  @IsString()
  @Length(0, 500)
  recaptcha: string;

  @IsBoolean()
  privacyAccepted: boolean;
}
