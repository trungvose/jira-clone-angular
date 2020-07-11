import { Process, Processor } from '@nestjs/bull';
import { ProjectIssueService, ProjectLane } from '@ngvn/api/project';
import { ProjectIssueJob, projectIssueQueueName } from '@ngvn/background/common';
import { Job } from 'bull';
import { Types } from 'mongoose';

@Processor(projectIssueQueueName)
export class ProjectIssueJobConsumer {
  constructor(private readonly projectIssueService: ProjectIssueService) {}

  @Process(ProjectIssueJob.BulkUpdateStatus)
  async bulkUpdateStatuses(job: Job<ProjectLane>) {
    const statusLaneCondition = job.data.conditions.find((condition) => condition.issueField === 'status');
    await this.projectIssueService.bulkUpdateByLaneCondition(job.data.issues as Types.ObjectId[], statusLaneCondition);
  }
}
