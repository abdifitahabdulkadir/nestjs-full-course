import { createKeyvNonBlocking } from '@keyv/redis';
import { Global, Module } from '@nestjs/common';
import {
  CacheModule as NestCacheModule,
  type CacheManagerOptions,
} from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cacheable } from 'cacheable';
import { CacheService } from './cache.service.js';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secondary = createKeyvNonBlocking(
          configService.getOrThrow<string>('REDIS_URL'),
          {
            namespace: 'redis',
            connectionTimeout: 3000,
            throwOnConnectError: false,
          },
        );
        const stores = new Cacheable({
          secondary,
          ttl: '1h',
          nonBlocking: true,
        });
        return {
          stores: stores as unknown as CacheManagerOptions['stores'],
          ttl: 60 * 60 * 1000,
        } satisfies CacheManagerOptions;
      },
    }),
  ],
  providers: [CacheService],
  exports: [NestCacheModule, CacheService],
})
export class CacheModule {}
