/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 500 // limit each IP to 500 requests per windowMs
      // 1 user: ca. max. 50 requests/min -> maximum 10 parallel users per IP
    })
  );

  // protect app from some well-known web vulnerabilities by setting HTTP headers
  app.use(helmet());

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3333;

  // ensure that all endpoints are protected from receiving incorrect data
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
