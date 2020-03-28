import { IsNotEmpty, IsString, IsUUID, IsIn } from 'class-validator';
import { PostEmailValidation } from '@wir-vs-virus/api-interfaces';

export class EmailValidationDTO implements PostEmailValidation {
  @IsUUID()
  @IsNotEmpty()
  privateUuid: string;

  @IsString()
  @IsIn(['volunteer', 'institution'])
  type: 'volunteer' | 'institution';
}
