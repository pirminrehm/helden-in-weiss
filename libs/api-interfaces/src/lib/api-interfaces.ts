import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export interface Volunteer {
  title: string;
  name: string;
  firstname: string;
  email: string;
  zipcode: number;
  city: string;
  age: number;
  phone: string;
  description: string;
  qualification: string[];
  location?: {
    type: string;
    coordinates: number[];
  };
  active?: Boolean;
  registeredAt?: string;
}

export interface Institution {
  name: string;
  zipcode: number;
  city: string;
  title: string;
  description: string;
  contact: {
    name: string;
    firstname: string;
    phone: string;
    email: string;
  };
  location?: {
    type: string;
    coordinates: number[];
  };
}

export const customErrorCodes = {
  ZIP_NOT_FOUND: 'ZIP_NOT_FOUND'
};

class Contact {
  name: string;
  firstname: string;
  phone: string;
  email: string;
}

class GeoLocation {
  type: string;
  coordinates: number[];
}


export class CreateVolunteerDto {
  // @IsString()
  title: string;
  // @IsString()
  name: string;
  // @IsString()
  firstname: string;
  // @IsString()
  email: string;
  // @IsNumber()
  zipcode: number;
  // @IsString()
  city: string;
  // @IsNumber()
  age: number;
  // @IsString()
  phone: string;
  // @IsString()
  description: string;
  // @IsArray()
  qualification: string[];
  location?: any
}

export class CreateInstitutionDto {
  // @IsString()
  name: string;
  // @IsNumber()
  zipcode: number;
  // @IsString()
  city: string;
  // @IsString()
  title: string;
  // @IsString()
  description: string;
  // @ValidateNested({ each: true })
  // @Type(() => Contact)
  contact: Contact;
  // @ValidateNested({ each: true })
  // @Type(() => GeoLocation)
  location?: GeoLocation;
}


