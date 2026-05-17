import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './exception/gloabal-exception.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.use(middleware1);
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));

  // you can get any service you have registered in the module.
  const config = app.get(ConfigService);

  await app.listen(config.get<string>('PORT') || 3000);
}
bootstrap();
