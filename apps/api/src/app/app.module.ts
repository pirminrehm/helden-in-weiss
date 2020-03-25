import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ContactController } from '../contact/contact.controller';
import { InstitutionController } from '../institution/institution.controller';
import { InstitutionSchema } from '../institution/institution.schema';
import { DatabaseService } from '../services/database.service';
import { LocationService } from '../services/location/location.service';
import { MailService } from '../services/mail/mail.service';
import { RecaptchaService } from '../services/recaptcha/recaptcha.service';
import { VolunteerController } from '../volunteer/volunteer.controller';
import { VolunteerSchema } from '../volunteer/volunteer.schema';
import { AppController } from './app.controller';

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
  controllers: [AppController, VolunteerController, InstitutionController, ContactController],
  providers: [DatabaseService, LocationService, RecaptchaService, MailService]
})
export class AppModule {}
