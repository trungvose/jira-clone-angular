import { getQueueToken } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectIssueJob, projectIssueQueueName } from '@ngvn/background/common';
import { DocumentType } from '@typegoose/typegoose';
import { Queue } from 'bull';
import { ApiProjectModule } from './api-project.module';
import { Project, ProjectIssue } from './models';
import { ProjectIssueRepository } from './project-issue.repository';
import { ProjectIssueResolver } from './project-issue.resolver';
import { ProjectIssueService } from './project-issue.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ProjectIssue.modelName,
        collection: 'project-issues',
        useFactory: (projectIssueQueue: Queue) => {
          const schema = ProjectIssue.schema;
          schema.pre<DocumentType<ProjectIssue>>('save', async function () {
            if (this.isModified('bodyMarkdown')) {
              await projectIssueQueue.add(ProjectIssueJob.GenerateOutputHtml, {
                id: this.id,
                markdown: this.bodyMarkdown,
              });
            }
          });
          return schema;
        },
        inject: [getQueueToken(projectIssueQueueName)],
      },
    ]),
    ApiProjectModule,
  ],
  providers: [ProjectIssueRepository, ProjectIssueService, ProjectIssueResolver],
  exports: [ProjectIssueService],
})
export class ApiProjectIssueModule {}
