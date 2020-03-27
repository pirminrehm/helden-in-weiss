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
import {
  customErrorCodes,
  GetInstitution,
  PostInstitution
} from '@wir-vs-virus/api-interfaces';
import { removeMongoIdFromArray, createUuid } from '../common/utils';
import { DatabaseService } from '../services/database.service';
import { Location } from '../services/location/location.interface';
import { LocationService } from '../services/location/location.service';
import { RecaptchaService } from '../services/recaptcha/recaptcha.service';
import { CreateInstitutionDTO } from './institution.dto';

@Controller('institution')
export class InstitutionController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly locationService: LocationService,
    private readonly recaptchaService: RecaptchaService
  ) {}

  @Get()
  async getAllInstitutions(
    @Query('searchTerm') searchTerm: string,
    @Query('zipcode') zipcode: number,
    @Query('radius') radius: number
  ): Promise<GetInstitution[]> {
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
  async createInstitution(@Body() institutionDTO: CreateInstitutionDTO) {
    // TODO: temporary fix to solve merge conflicts
    const institution: any = institutionDTO;
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
    institution.privateUuid = createUuid();
    institution.publicUuid = createUuid();
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
