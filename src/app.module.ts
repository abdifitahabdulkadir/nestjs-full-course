import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import z from 'zod';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CacheModule } from './cache/cache.module.js';
import { CatsModule } from './cats/cats.module.js';
import { CustomerModule } from './customer/customer.module.js';
import { DatabaseModule } from './database/database.module.js';
import { GlobalModule } from './global/global.module.js';
import { StudentModule } from './student/student.module.js';

@Module({
  imports: [
    CatsModule,
    CustomerModule,
    StudentModule,
    GlobalModule,
    // CacheModule.register({
    //   isGlobal: true,
    //   ttl: 30 * 1000, // 30 seconds. by defualt is 50 seconds
    // }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate(config) {
        return z
          .object({
            JWT_SECRET_KEY: z.string(),
            PORT: z.literal('3000', { message: 'PORT must be 3000' }),
            DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
            REDIS_URL: z.string().min(1, 'REDIS_URL is required'),
          })
          .parse(config);
      },
    }),
    DatabaseModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}

/**
 * this is the module class that implements NestModule interface.
 * and it is used to configure the middleware for the app.
 * and we apply all routes. we can specify specific routes too and
 * its method incase we need to do so.
 */

// class based is bettter when you have dependencies on other modules.
// export class AppModule implements NestModule {
/**
 * Attaches either routes or controllers
 * to the current middleware. If you pass a controller class,
 * Nest will attach the current middleware to every path defined within it.
 * we can pass a string to forRoutes to apply the middleware to all routes.
 **/
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AppMiddleware).forRoutes('*');
//   }
// }
