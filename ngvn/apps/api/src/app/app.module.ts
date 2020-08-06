import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiAuthModule } from '@ngvn/api/auth';
import { ApiCachingModule } from '@ngvn/api/caching';
import { ApiCommonProvidersModule } from '@ngvn/api/common-providers';
import { ApiConfigModule, dbConfiguration, InjectArenaConfig, InjectRedisConfig } from '@ngvn/api/config';
import '@ngvn/api/mappings';
import { ArenaConfig, DbConfig, RedisConfig } from '@ngvn/api/types';
import { queueNames } from '@ngvn/background/common';
import Bull from 'bull';
import { AutomapperModule } from 'nestjsx-automapper';
import { ApiModule } from './api.module';
import { BackgroundModule } from './background.module';
import { GqlModule } from './gql.module';

const Arena = require('bull-arena');

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [dbConfiguration.KEY],
      useFactory: (dbConfig: DbConfig) => dbConfig,
    }),
    GqlModule,
    ApiCommonProvidersModule,
    AutomapperModule.withMapper({ useUndefined: true }),
    ApiConfigModule,
    ApiCachingModule,
    ApiAuthModule,
    BackgroundModule,
    ApiModule,
  ],
})
export class AppModule implements NestModule {
  private readonly arena = Arena(
    {
      Bull,
      queues: queueNames.map((queueName) => ({
        name: queueName,
        hostId: queueName,
        redis: { host: this.redisConfig.host, port: this.redisConfig.port },
        type: 'bull',
      })),
    },
    this.arenaConfig,
  );

  constructor(
    @InjectRedisConfig() private readonly redisConfig: RedisConfig,
    @InjectArenaConfig() private readonly arenaConfig: ArenaConfig,
  ) {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(this.arena).forRoutes('/api/arena');
  }
}
