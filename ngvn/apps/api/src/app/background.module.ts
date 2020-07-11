import { Module } from '@nestjs/common';
import { BackgroundProjectIssueJobModule } from '@ngvn/background/project-issue-job';
import { BackgroundUserJobModule } from '@ngvn/background/user-job';

export const backgroundModules = [BackgroundUserJobModule, BackgroundProjectIssueJobModule];

@Module({ imports: [...backgroundModules] })
export class BackgroundModule {}
