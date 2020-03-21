import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { DatabaseService } from '../services/database.service';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly databaseService: DatabaseService){}

  @Get()
  getAllVolunteer(): Promise<[Volunteer]> {
    return this.databaseService.getAllVolunteers();
  }

  @Post()
  async createVolunteer(@Body() volunteer: Volunteer) {
    Logger.log(volunteer)
    return await this.databaseService.saveVolunteer(volunteer);
  }
}
