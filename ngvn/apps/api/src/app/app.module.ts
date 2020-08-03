import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiAuthModule } from '@ngvn/api/auth';
import { ApiCachingModule } from '@ngvn/api/caching';
import { ApiCommonProvidersModule } from '@ngvn/api/common-providers';
import { ApiConfigModule, dbConfiguration } from '@ngvn/api/config';
import '@ngvn/api/mappings';
import { DbConfig } from '@ngvn/api/types';
import { AutomapperModule } from 'nestjsx-automapper';
import { ApiModule } from './api.module';
import { BackgroundModule } from './background.module';
import { GqlModule } from './gql.module';

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
export class AppModule {}
