import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInstitutionDto {
    @IsString()
    name: string;
    @IsNumber()
    zipcode: number;
    @IsString()
    city: string;
    @IsString()
    title: string;
    @IsString()
    description: string;
    @ValidateNested({ each: true })
    @Type(() => Contact)
    contact: Contact;
    @ValidateNested({ each: true })
    @Type(() => GeoLocation)
    location?: GeoLocation;
  }
  
  export class Contact {
    name: string;
    firstname: string;
    phone: string;
    email: string;
  }
  
  export class GeoLocation {
    type: string;
    coordinates: number[];
  }