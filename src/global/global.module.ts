import { Global, Module } from '@nestjs/common';
import { CatsService } from '../cats/cats.service.js';

/**
 * we have gloabl module means we can register any service/module as gloabl
 * and every module will have access to
 * this service/module without importing it.
 */
@Global()
@Module({
  providers: [CatsService],
  exports: [CatsService],
})
export class GlobalModule {}
