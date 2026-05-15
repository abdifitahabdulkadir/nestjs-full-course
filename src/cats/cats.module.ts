import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CatsMiddleware } from 'middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,

      //gloabl means this options apply to all
      //the modules in the application.
      secret: process.env.JWT_SECRET_KEY,
      publicKey: process.env.JWT_SECRET_KEY,
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [CatsService],
  controllers: [CatsController],
  exports: [CatsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CatsMiddleware).forRoutes('/cats');
  }
}
