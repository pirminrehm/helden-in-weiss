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
import { Institution } from '@wir-vs-virus/api-interfaces';
import { DatabaseService } from '../services/database.service';
import { LocationService } from '../services/location.service';
import { removeMongoIdFromArray } from '../common/utils';

@Controller('institution')
export class InstitutionController {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly locationService: LocationService,
    private readonly httpservice: HttpService
  ) {}

  @Get()
  async getAllInstitutions(
    @Query('zipcode') zipcode: number,
    @Query('radius') radius: number
  ): Promise<[Institution]> {
    if (zipcode && radius) {
      try {
        const coordinates = await this.locationService.getCoordinatesFromZipcode(
          zipcode
        );
        return removeMongoIdFromArray(
          this.databaseService.getAllInstitutionsWithinRadius(
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
        this.databaseService.getAllInstitutionsByZipCode(zipcode)
      );
    }
    return removeMongoIdFromArray(this.databaseService.getAllInstitutions());
  }

  @Post()
  async createInstitution(@Body() institution: Institution) {
    console.log(institution);
    const zipcode = institution.zipcode;
    let coordinates;

    try {
      coordinates = await this.locationService.getCoordinatesFromZipcode(
        zipcode
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }

    console.log('coordinates', coordinates);
    institution.location = {
      type: 'Point',
      coordinates: coordinates
    };
    Logger.log(institution);
    return await this.databaseService.saveInstitution(institution);
  }
}
