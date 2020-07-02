import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiAuthModule } from '@ngvn/api/auth';
import { ApiCachingModule } from '@ngvn/api/caching';
import { ApiConfigModule, appConfiguration, dbConfiguration } from '@ngvn/api/config';
import '@ngvn/api/mappings';
import { AppConfig, DbConfig } from '@ngvn/api/types';
import { AutomapperModule } from 'nestjsx-automapper';
import { ApiModule, apiModules } from './api.module';
import { BackgroundModule } from './background.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [dbConfiguration.KEY],
      useFactory: (dbConfig: DbConfig) => dbConfig,
    }),
    GraphQLModule.forRootAsync({
      inject: [appConfiguration.KEY],
      useFactory: (appConfig: AppConfig) => ({
        autoSchemaFile: 'schema.gql',
        context: ({ req, res }) => ({ req, res }),
        debug: appConfig.env === 'development',
        playground: appConfig.env === 'development',
        include: [...apiModules],
      }),
    }),
    AutomapperModule.withMapper(),
    ApiConfigModule,
    ApiCachingModule,
    ApiAuthModule,
    ApiModule,
    BackgroundModule,
  ],
})
export class AppModule {}
