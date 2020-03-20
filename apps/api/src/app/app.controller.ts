import { Controller, Get, Post, Body } from '@nestjs/common';

import { Helper } from '@wir-vs-virus/api-interfaces';

import { DatabaseService } from './database.service';

@Controller()
export class AppController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('helpers')
  getAllHelper(): Promise<[Helper]> {
    return this.databaseService.getHelpers();
  }

  @Post('helper')
  async create(@Body() helper: Helper) {
    // does not work yet
    console.log(helper)
    return await this.databaseService.saveHelper(helper);
  }
}
