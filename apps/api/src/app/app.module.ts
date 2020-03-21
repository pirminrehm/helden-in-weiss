import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { VolunteerController } from '../volunteer/volunteer.controller';
import { DatabaseService } from '../services/database.service';
import { VolunteerSchema } from '../volunteer/volunteer.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/api/src/app/.env',
    }),
    MongooseModule.forRoot(`mongodb+srv://virusUser:${process.env.MONGO_PASSWD}@grip-playground-sxifp.azure.mongodb.net/test?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'Volunteer', schema: VolunteerSchema }]),
  ],
  controllers: [AppController, VolunteerController],
  providers: [DatabaseService]
})

export class AppModule {}


