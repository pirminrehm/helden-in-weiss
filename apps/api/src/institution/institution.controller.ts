import { Controller, Get, Post, Body, Logger, Param, Query } from '@nestjs/common';
import { Institution } from '@wir-vs-virus/api-interfaces';
import { DatabaseService } from '../services/database.service';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly databaseService: DatabaseService){}

  @Get()
  getAllInstitutionsByZipCode(@Query('zipcode') zipcode: Number): Promise<[Institution]> {
    if (zipcode) {
      return this.databaseService.getAllInstitutionsByZipCode(zipcode);
    } else {
      return this.databaseService.getAllInstitutions();
    }
  }

  @Post()
  async createInstitution(@Body() institution: Institution) {
    Logger.log(institution)
    return await this.databaseService.saveInstitution(institution);
  }
}
