import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { DatabaseService } from '../services/database.service';

import { removeMongoIdFromArray } from '../common/utils';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async getAllVolunteer(): Promise<[Volunteer]> {
    const vols = await this.databaseService.getLatestsVolunteers();
    return removeMongoIdFromArray(vols);
  }

  @Post()
  async createVolunteer(@Body() volunteer: Volunteer) {
    Logger.log(volunteer);
    return await this.databaseService.saveVolunteer(volunteer);
  }
}
