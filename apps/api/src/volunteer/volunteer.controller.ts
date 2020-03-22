import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Query,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { DatabaseService } from '../services/database.service';

import { removeMongoIdFromArray } from '../common/utils';
import { LocationService } from '../services/location.service';

@Controller('volunteer')
export class VolunteerController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly locationService: LocationService
  ) {}

  @Get()
  async getAllVolunteer(
    @Query('searchTerm') searchTerm: string,
    @Query('zipcode') zipcode: number,
    @Query('radius') radius: number
  ): Promise<Volunteer[]> {
    if (zipcode && radius) {
      try {
        const coordinates = await this.locationService.getCoordinatesFromZipcode(
          zipcode
        );
        return removeMongoIdFromArray(
          await this.databaseService.getAllVolunteersWithinRadius(
            coordinates,
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
      await this.databaseService.getVolunteers(searchTerm, zipcode)
    );
  }

  @Post()
  async createVolunteer(@Body() volunteer: Volunteer) {
    const zipcode = volunteer.zipcode;
    let coordinates;
    try {
      coordinates = await this.locationService.getCoordinatesFromZipcode(
        zipcode
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
    Logger.log('coordinates', coordinates);
    volunteer.location = {
      type: 'Point',
      coordinates: coordinates
    };
    Logger.log(volunteer);
    return await this.databaseService.saveVolunteer(volunteer);
  }
}
