import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { VolunteerController } from '../volunteer/volunteer.controller';
import { InstitutionController } from '../institution/institution.controller';
import { DatabaseService } from '../services/database.service';
import { LocationService } from '../services/location/location.service';
import { VolunteerSchema } from '../volunteer/volunteer.schema';
import { InstitutionSchema } from '../institution/institution.schema';
import { MailService } from '../services/mail/mail.service';
import { ContactController } from '../contact/contact.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/api/src/app/.env'
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    MongooseModule.forFeature([{ name: 'Volunteer', schema: VolunteerSchema }]),
    MongooseModule.forFeature([
      { name: 'Institution', schema: InstitutionSchema }
    ]),
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'helper-app')
    })
  ],
  controllers: [
    AppController,
    VolunteerController,
    InstitutionController,
    ContactController
  ],
  providers: [DatabaseService, LocationService, MailService]
})
export class AppModule {}
