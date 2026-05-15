import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/gloabal-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.use(middleware1);
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
