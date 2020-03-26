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
import { customErrorCodes, Volunteer } from '@wir-vs-virus/api-interfaces';
import { removeMongoIdFromArray } from '../common/utils';
import { DatabaseService } from '../services/database.service';
import { Location } from '../services/location/location.interface';
import { LocationService } from '../services/location/location.service';
import { RecaptchaService } from '../services/recaptcha/recaptcha.service';

@Controller('volunteer')
export class VolunteerController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly locationService: LocationService,
    private readonly recaptchaService: RecaptchaService
  ) {}

  @Get()
  async getAllVolunteer(
    @Query('searchTerm') searchTerm: string,
    @Query('zipcode') zipcode: number,
    @Query('radius') radius: number
  ): Promise<Volunteer[]> {
    if (zipcode && radius) {
      try {
        const locationData = await this.locationService.getLocationInfoByZipcode(
          zipcode
        );
        return removeMongoIdFromArray(
          await this.databaseService.getAllVolunteersWithinRadius(
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
        await this.databaseService.getAllVolunteersByZipCode(zipcode)
      );
    }
    return removeMongoIdFromArray(
      await this.databaseService.getVolunteers(searchTerm, zipcode?.toString())
    );
  }

  @Post()
  async createVolunteer(@Body() volunteer: Volunteer) {
    const zipcode = volunteer.zipcode;
    let locationData: Location;

    await this.validateCaptcha(volunteer.recaptcha);

    try {
      locationData = await this.locationService.getLocationInfoByZipcode(
        zipcode
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
    Logger.log('coordinates', locationData.coordinates.toString());
    volunteer.location = {
      type: 'Point',
      coordinates: locationData.coordinates
    };
    volunteer.city = locationData.city;
    Logger.log(volunteer);
    return await this.databaseService.saveVolunteer(volunteer);
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
