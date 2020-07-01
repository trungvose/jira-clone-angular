import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiAuthModule } from '@ngvn/api/auth';
import { ApiCachingModule } from '@ngvn/api/caching';
import { ApiConfigModule, dbConfiguration } from '@ngvn/api/config';
import '@ngvn/api/mappings';
import { ApiPermissionModule } from '@ngvn/api/permission';
import { ApiSecurityModule } from '@ngvn/api/security';
import { DbConfig } from '@ngvn/api/types';
import { ApiUserModule } from '@ngvn/api/user';
import { BackgroundUserJobModule } from '@ngvn/background/user-job';
import { AutomapperModule } from 'nestjsx-automapper';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [dbConfiguration.KEY],
      useFactory: (dbConfig: DbConfig) => ({
        uri: dbConfig.uri,
        dbName: dbConfig.dbName,
        retryAttempts: 5,
        retryDelay: 1000,
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
    }),
    AutomapperModule.withMapper(),
    GraphQLModule.forRootAsync({
      useFactory: () => {
        console.log(__dirname);
        return {
          autoSchemaFile: 'schema.gql',
          context: ({ req, res }) => ({ req, res }),
          debug: true,
          playground: true,
          include: [ApiSecurityModule, ApiUserModule],
        };
      },
    }),
    ApiConfigModule,
    ApiCachingModule,
    ApiAuthModule,
    ApiUserModule,
    ApiPermissionModule,
    ApiSecurityModule,
    BackgroundUserJobModule,
  ],
})
export class AppModule {}
