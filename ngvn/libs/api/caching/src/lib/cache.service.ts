import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<TType = unknown>(cacheKey: string, cb: () => Promise<TType>, ttl?: number): Promise<TType> {
    return await this.cache.wrap(cacheKey, cb, { ttl });
  }

  async clear(cacheKey: string): Promise<unknown> {
    return await this.cache.del(cacheKey);
  }
}
