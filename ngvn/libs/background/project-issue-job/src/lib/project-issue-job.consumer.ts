import { Process, Processor } from '@nestjs/bull';
import { MarkdownService } from '@ngvn/api/common-providers';
import { ProjectIssueService, ProjectLane } from '@ngvn/api/project';
import { ProjectIssueJob, projectIssueQueueName } from '@ngvn/background/common';
import { Job } from 'bull';
import { Types } from 'mongoose';

@Processor(projectIssueQueueName)
export class ProjectIssueJobConsumer {
  constructor(
    private readonly projectIssueService: ProjectIssueService,
    private readonly markdownService: MarkdownService,
  ) {}

  @Process(ProjectIssueJob.BulkUpdateStatus)
  async bulkUpdateStatuses(job: Job<ProjectLane>) {
    const statusLaneCondition = job.data.conditions.find((condition) => condition.issueField === 'status');
    await this.projectIssueService.bulkUpdateByLaneCondition(job.data.issues as Types.ObjectId[], statusLaneCondition);
  }

  @Process(ProjectIssueJob.GenerateOutputHtml)
  async generateOutputHtml(job: Job<{ id: string; markdown: string }>) {
    await this.projectIssueService.updateBy(job.data.id, {
      $set: { outputHtml: this.markdownService.generateHtml(job.data.markdown) },
    });
  }
}
