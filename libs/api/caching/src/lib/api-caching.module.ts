import { CacheModule, Global, Module } from '@nestjs/common';
import { redisConfiguration } from '@ngvn/api/config';
import { RedisConfig } from '@ngvn/api/types';
import ioRedisStore from 'cache-manager-ioredis';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [redisConfiguration.KEY],
      useFactory: (redisConfig: RedisConfig) => ({
        store: ioRedisStore,
        host: redisConfig.host,
        port: redisConfig.port,
        ttl: Number(redisConfig.ttl),
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class ApiCachingModule {}
