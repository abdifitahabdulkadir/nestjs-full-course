import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppMiddleware } from 'middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CustomerModule } from './customer/customer.module';
import { GlobalModule } from './global/global.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    CatsModule,
    CustomerModule,
    StudentModule,
    GlobalModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})

/**
 * this is the module class that implements NestModule interface.
 * and it is used to configure the middleware for the app.
 * and we apply all routes. we can specify specific routes too and
 * its method incase we need to do so.
 */

// class based is bettter when you have dependencies on other modules.
export class AppModule implements NestModule {
  /**
   * Attaches either routes or controllers
   * to the current middleware. If you pass a controller class,
   * Nest will attach the current middleware to every path defined within it.
   * we can pass a string to forRoutes to apply the middleware to all routes.
   **/
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
