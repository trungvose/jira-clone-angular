import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { PermissionService } from '@ngvn/api/permission';
import { ProjectService } from '@ngvn/api/project';
import { PermissionJob, permissionQueueName, UserJob, userQueueName } from '@ngvn/background/common';
import { Job, Queue } from 'bull';

@Processor(permissionQueueName)
export class PermissionJobConsumer {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly projectService: ProjectService,
    @InjectQueue(userQueueName) private readonly userQueue: Queue,
  ) {}

  @Process(PermissionJob.CreateProjectIssuePermission)
  async createProjectIssuePermission(job: Job<{ issueId: string; projectId: string }>) {
    const { issueId, projectId } = job.data;
    const [ownerId, userIds] = await this.projectService.findOwnerAndUsers(projectId);
    const [ownerPermissionId, userPermissionId] = await this.permissionService.createProjectIssuePermission(issueId);
    await this.userQueue.add(UserJob.UpdateUserPermission, { userId: ownerId, permissionId: ownerPermissionId });
    for (const userId of userIds) {
      await this.userQueue.add(UserJob.UpdateUserPermission, { userId: userId, permissionId: userPermissionId });
    }
  }
}
