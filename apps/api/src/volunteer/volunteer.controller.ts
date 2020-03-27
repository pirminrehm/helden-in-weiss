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
import { customErrorCodes, GetVolunteer } from '@wir-vs-virus/api-interfaces';
import { createUuid } from '../common/utils';
import { Location } from '../services/location/location.interface';
import { LocationService } from '../services/location/location.service';
import { RecaptchaService } from '../services/recaptcha/recaptcha.service';
import { VolunteerService } from './volunteer.service';
import { VolunteerModel } from './volunteer.model';
import { CreateVolunteerDTO } from './volunteer.dto';

@Controller('volunteer')
export class VolunteerController {
  constructor(
    private readonly volunteerService: VolunteerService,
    private readonly locationService: LocationService,
    private readonly recaptchaService: RecaptchaService
  ) {}

  @Get()
  async getVolunteer(
    @Query('searchTerm') searchTerm: string,
    @Query('zipcode') zipcode: number,
    @Query('radius') radius: number
  ): Promise<GetVolunteer[]> {
    let locationData: Location;
    if (zipcode) {
      try {
        locationData = await this.locationService.getLocationInfoByZipcode(
          zipcode
        );
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }

    return this.volunteerService.mapModelToInterfaceArary(
      await this.volunteerService.getVolunteers(
        zipcode,
        locationData,
        radius,
        searchTerm
      )
    );
  }

  @Post()
  async createVolunteer(@Body() volunteer: CreateVolunteerDTO) {
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

    const volunteerToSave: VolunteerModel = {
      ...volunteer,
      location: {
        type: 'Point',
        coordinates: locationData.coordinates
      },
      city: locationData.city,
      privateUuid: createUuid(),
      publicUuid: createUuid()
    };
    Logger.log(volunteer);
    return await this.volunteerService.saveVolunteer(volunteerToSave);
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
