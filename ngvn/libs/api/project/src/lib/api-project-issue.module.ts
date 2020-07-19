import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiProjectModule } from './api-project.module';
import { ProjectIssue } from './models';
import { ProjectIssueRepository } from './project-issue.repository';
import { ProjectIssueResolver } from './project-issue.resolver';
import { ProjectIssueService } from './project-issue.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ ...ProjectIssue.featureConfig, collection: 'project-issues' }]),
    ApiProjectModule,
  ],
  providers: [ProjectIssueRepository, ProjectIssueService, ProjectIssueResolver],
  exports: [ProjectIssueService],
})
export class ApiProjectIssueModule {}
