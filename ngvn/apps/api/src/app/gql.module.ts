import { Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { appConfiguration } from '@ngvn/api/config';
import { AppConfig } from '@ngvn/api/types';
import { PermissionType } from '@ngvn/shared/permission';
import {
  ProjectCategory,
  ProjectIssuePriority,
  ProjectIssueStatus,
  ProjectIssueType,
  ProjectTimelineType,
} from '@ngvn/shared/project';
import { apiModules } from './api.module';

registerEnumType(PermissionType, { name: 'PermissionType' });

registerEnumType(ProjectCategory, { name: 'ProjectCategory' });
registerEnumType(ProjectIssueStatus, { name: 'ProjectIssueStatus' });
registerEnumType(ProjectIssuePriority, { name: 'ProjectIssuePriority' });
registerEnumType(ProjectIssueType, { name: 'ProjectIssueType' });
registerEnumType(ProjectTimelineType, { name: 'ProjectTimelineType' });

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      inject: [appConfiguration.KEY],
      useFactory: (appConfig: AppConfig) => ({
        autoSchemaFile: 'schema.graphql',
        context: ({ req, res }) => ({ req, res }),
        debug: appConfig.env === 'development',
        playground: appConfig.env === 'development',
        include: [...apiModules],
      }),
    }),
  ],
})
export class GqlModule {}
