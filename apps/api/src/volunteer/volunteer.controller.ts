import { Controller, Get, Post, Body, Logger, Query } from '@nestjs/common';
import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { DatabaseService } from '../services/database.service';

import { removeMongoIdFromArray } from '../common/utils';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async getAllVolunteer(
    @Query('searchTerm') searchTerm,
    @Query('searchPLZ') searchPLZ
  ): Promise<Volunteer[]> {
    return removeMongoIdFromArray(
      await this.databaseService.getVolunteers(searchTerm, searchPLZ)
    );
  }

  @Post()
  async createVolunteer(@Body() volunteer: Volunteer) {
    Logger.log(volunteer);
    return await this.databaseService.saveVolunteer(volunteer);
  }
}
