import {
  Controller,
  Post,
  Body,
  Logger,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { InstitutionService } from '../institution/institution.service';
import { EmailValidationDTO } from './email-validation.dto';
import { customErrorCodes } from '@wir-vs-virus/api-interfaces';
import { VolunteerService } from '../volunteer/volunteer.service';

@Controller('email-validation')
export class EmailValidationController {
  constructor(
    private readonly institutionService: InstitutionService,
    private readonly volunteerService: VolunteerService
  ) {}

  @Post()
  async createInstitution(@Body() body: EmailValidationDTO) {
    let update;
    if (body.type === 'institution') {
      update = await this.institutionService.activatByPrivateUuid(
        body.privateUuid
      );
    }

    if (body.type === 'volunteer') {
      update = await this.volunteerService.activatByPrivateUuid(
        body.privateUuid
      );
    }

    if (!update) {
      throw new HttpException(
        customErrorCodes.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    }
    return { success: true };
  }
}
