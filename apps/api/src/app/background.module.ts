import { Module } from '@nestjs/common';
import { BackgroundPermissionJobModule } from '@ngvn/background/permission-job';
import { BackgroundProjectIssueJobModule } from '@ngvn/background/project-issue-job';
import { BackgroundProjectJobModule } from '@ngvn/background/project-job';
import { BackgroundUserJobModule } from '@ngvn/background/user-job';

export const backgroundModules = [
  BackgroundUserJobModule,
  BackgroundProjectIssueJobModule,
  BackgroundProjectJobModule,
  BackgroundPermissionJobModule,
];

@Module({ imports: [...backgroundModules] })
export class BackgroundModule {}
