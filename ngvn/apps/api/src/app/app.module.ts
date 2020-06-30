import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiAuthModule } from '@ngvn/api/auth';
import { ApiCachingModule } from '@ngvn/api/caching';
import { ApiConfigModule, dbConfiguration } from '@ngvn/api/config';
import '@ngvn/api/mappings';
import { ApiRoleModule } from '@ngvn/api/role';
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
    ApiConfigModule,
    ApiCachingModule,
    ApiAuthModule,
    ApiUserModule,
    ApiRoleModule,
    ApiSecurityModule,
    BackgroundUserJobModule,
  ],
})
export class AppModule {}
