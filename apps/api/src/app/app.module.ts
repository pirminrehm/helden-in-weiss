import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { VolunteerController } from '../volunteer/volunteer.controller';
import { InstitutionController } from '../institution/institution.controller';
import { DatabaseService } from '../services/database.service';
import { LocationService } from '../services/location.service';
import { VolunteerSchema } from '../volunteer/volunteer.schema';
import { InstitutionSchema } from '../institution/institution.schema';

import { join } from 'path';
import { RecaptchaService } from '../services/recaptcha/recaptcha.service';

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
  controllers: [AppController, VolunteerController, InstitutionController],
  providers: [DatabaseService, LocationService, RecaptchaService]
})
export class AppModule {}
