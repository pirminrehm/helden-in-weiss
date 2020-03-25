import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Query,
  HttpService,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Institution, customErrorCodes } from '@wir-vs-virus/api-interfaces';
import { DatabaseService } from '../services/database.service';
import { LocationService } from '../services/location.service';
import { Location } from '../services/location.interface';
import { removeMongoIdFromArray } from '../common/utils';
import { RecaptchaService } from '../services/recaptcha/recaptcha.service';

@Controller('institution')
export class InstitutionController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly locationService: LocationService,
    private readonly recaptchaService: RecaptchaService,
    private readonly httpservice: HttpService
  ) {}

  @Get()
  async getAllInstitutions(
    @Query('searchTerm') searchTerm: string,
    @Query('zipcode') zipcode: number,
    @Query('radius') radius: number
  ): Promise<Institution[]> {
    if (zipcode && radius) {
      try {
        const locationData = await this.locationService.getLocationInfoByZipcode(
          zipcode
        );
        return removeMongoIdFromArray(
          await this.databaseService.getAllInstitutionsWithinRadius(
            locationData.coordinates,
            radius
          )
        );
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }
    if (zipcode) {
      return removeMongoIdFromArray(
        await this.databaseService.getAllInstitutionsByZipCode(zipcode)
      );
    }
    return removeMongoIdFromArray(
      await this.databaseService.getInstitutions(searchTerm, zipcode)
    );
  }

  @Post()
  async createInstitution(@Body() institution: Institution) {
    const zipcode = institution.zipcode;
    let locationData: Location;

    await this.validateCaptcha(institution.recaptcha);

    try {
      locationData = await this.locationService.getLocationInfoByZipcode(
        zipcode
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }

    console.log('coordinates', locationData.coordinates);
    institution.location = {
      type: 'Point',
      coordinates: locationData.coordinates
    };
    institution.city = locationData.city;
    Logger.log(institution);
    return await this.databaseService.saveInstitution(institution);
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
