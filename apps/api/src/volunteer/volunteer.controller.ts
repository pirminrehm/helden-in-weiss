import { Controller, Get, Post, Body, Logger } from '@nestjs/common';

import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { DatabaseService } from '../services/database.service';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly databaseService: DatabaseService){}

  @Get()
  getAllVolunteer(): Promise<[Volunteer]> {
    return this.databaseService.getVolunteers();
  }

  @Post()
  async createVolunteer(@Body() createVolunteerDto: CreateVolunteerDto) {
    Logger.log(createVolunteerDto)
    return await  this.databaseService.saveVolunteer(createVolunteerDto);
  }
}
