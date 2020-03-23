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
import { Location } from '../services/location.interface';
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
}
