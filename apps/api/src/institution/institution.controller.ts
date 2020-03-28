import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query
} from '@nestjs/common';
import { customErrorCodes, GetInstitution } from '@wir-vs-virus/api-interfaces';
import { createUuid } from '../common/utils';
import { InstitutionService } from './institution.service';
import { LocationInfo } from '../services/location/location.interface';
import { LocationService } from '../services/location/location.service';
import { RecaptchaService } from '../services/recaptcha/recaptcha.service';
import { CreateInstitutionDTO } from './institution.dto';
import { InstitutionModel } from './institution.model';

@Controller('institution')
export class InstitutionController {
  constructor(
    private readonly institutionService: InstitutionService,
    private readonly locationService: LocationService,
    private readonly recaptchaService: RecaptchaService
  ) {}

  @Get()
  async getAllInstitutions(
    @Query('searchTerm') searchTerm: string,
    @Query('zipcode') zipcode: number,
    @Query('radius') radius: number
  ): Promise<GetInstitution[]> {
    let locationData: LocationInfo;
    if (zipcode) {
      try {
        locationData = await this.locationService.getLocationInfoByZipcode(
          zipcode
        );
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }

    return (
      await this.institutionService.getMany(
        zipcode,
        locationData,
        radius,
        searchTerm
      )
    ).map(this.institutionService.mapModelToInterface);
  }

  @Post()
  async createInstitution(@Body() institution: CreateInstitutionDTO) {
    const zipcode = institution.zipcode;
    let locationData: LocationInfo;

    await this.validateCaptcha(institution.recaptcha);

    try {
      locationData = await this.locationService.getLocationInfoByZipcode(
        zipcode
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }

    const institutionToSave: InstitutionModel = {
      ...institution,
      location: {
        type: 'Point',
        coordinates: locationData.coordinates
      },
      city: locationData.city,
      privateUuid: createUuid(),
      publicUuid: createUuid()
    };

    Logger.log(
      'Sucessfully created institution with publicUuid: ' +
        institutionToSave.publicUuid
    );
    return await this.institutionService.save(institutionToSave);
  }

  async validateCaptcha(captcha) {
    const validation = await this.recaptchaService.validate(captcha);
    if (!validation.success) {
      Logger.warn(validation.message);
      throw new HttpException(
        customErrorCodes.CAPTCHA_NOT_FOUND,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
