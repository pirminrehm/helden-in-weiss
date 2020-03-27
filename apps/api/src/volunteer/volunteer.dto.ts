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

export class VolunteerDTO {
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

  @IsBoolean()
  active?: boolean;

  @IsString()
  @Length(0, 500)
  recaptcha: string;

  @IsBoolean()
  privacyAccepted: boolean;
}
