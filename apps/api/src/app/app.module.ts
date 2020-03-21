import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { VolunteerController } from '../volunteer/volunteer.controller';
import { InstitutionController } from '../institution/institution.controller';
import { DatabaseService } from '../services/database.service';
import { LocationService } from '../services/location.service';
import { VolunteerSchema } from '../volunteer/volunteer.schema';
import { InstitutionSchema } from '../institution/institution.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/api/src/app/.env',
    }),
    MongooseModule.forRoot(`mongodb+srv://virusUser:${process.env.MONGO_PASSWD}@grip-playground-sxifp.azure.mongodb.net/test?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'Volunteer', schema: VolunteerSchema }]),
    MongooseModule.forFeature([{ name: 'Institution', schema: InstitutionSchema }]),
    HttpModule
  ],
  controllers: [AppController, VolunteerController, InstitutionController],
  providers: [DatabaseService, LocationService]
})

export class AppModule {}
