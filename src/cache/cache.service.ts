import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T = any>(key: string): Promise<T | undefined> {
    return await this.cache.get(key);
  }

  async set<T = any>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async reset(): Promise<void> {
    await this.cache.clear();
  }
}
