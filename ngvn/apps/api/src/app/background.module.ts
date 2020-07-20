import { Module } from '@nestjs/common';
import { BackgroundProjectIssueJobModule } from '@ngvn/background/project-issue-job';
import { BackgroundProjectJobModule } from '@ngvn/background/project-job';
import { BackgroundUserJobModule } from '@ngvn/background/user-job';

export const backgroundModules = [BackgroundUserJobModule, BackgroundProjectIssueJobModule, BackgroundProjectJobModule];

@Module({ imports: [...backgroundModules] })
export class BackgroundModule {}
