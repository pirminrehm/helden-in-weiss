import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { DatabaseService } from './database.service';
import { HelperSchema } from './helper.schema';

const mongoPassword = process.env.MONGO_PASSWD;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/api/src/app/.env',
    }),
    MongooseModule.forRoot(`mongodb+srv://virusUser:${process.env.MONGO_PASSWD}@grip-playground-sxifp.azure.mongodb.net/test?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'Helper', schema: HelperSchema }]),
  ],
  controllers: [AppController],
  providers: [DatabaseService]
})

export class AppModule {}


