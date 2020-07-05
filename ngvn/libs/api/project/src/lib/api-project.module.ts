import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectIssue } from './models';
import { ProjectIssueRepository } from './project-issue.repository';
import { ProjectIssueService } from './project-issue.service';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';
import { ProjectIssueResolver } from './project-issue.resolver';
import { ProjectResolver } from './project.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([Project.featureConfig, { ...ProjectIssue.featureConfig, collection: 'project-issues' }]),
  ],
  providers: [
    ProjectRepository,
    ProjectIssueRepository,
    ProjectService,
    ProjectIssueService,
    ProjectResolver,
    ProjectIssueResolver,
  ],
  exports: [ProjectService, ProjectIssueService],
})
export class ApiProjectModule {}
