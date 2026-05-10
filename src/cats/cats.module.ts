import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsMiddleware } from 'middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  providers: [CatsService],
  controllers: [CatsController],
  exports: [CatsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CatsMiddleware).forRoutes('/cats');
  }
}
