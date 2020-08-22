import { Process, Processor } from '@nestjs/bull';
import { ProjectService } from '@ngvn/api/project';
import { ProjectJob, projectQueueName } from '@ngvn/background/common';
import { ProjectIssueStatus } from '@ngvn/shared/project';
import { Job } from 'bull';

@Processor(projectQueueName)
export class ProjectJobConsumer {
  constructor(private readonly projectService: ProjectService) {}

  @Process(ProjectJob.UpdateLanesWithIssue)
  async updateLanesWithIssue(
    job: Job<{ projectId: string; issueId: string; statuses: [ProjectIssueStatus, ProjectIssueStatus?] }>,
  ) {
    const { issueId, projectId, statuses } = job.data;
    await this.projectService.updateLanesWithIssue(projectId, issueId, ...statuses);
  }
}
