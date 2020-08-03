import { Process, Processor } from '@nestjs/bull';
import { PermissionService } from '@ngvn/api/permission';
import { User, UserService } from '@ngvn/api/user';
import { UserJob, userQueueName } from '@ngvn/background/common';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { Job } from 'bull';
import { Types } from 'mongoose';

@Processor(userQueueName)
export class UserJobConsumer {
  constructor(private readonly userService: UserService, private readonly permissionService: PermissionService) {}

  @Process(UserJob.AddUser)
  async addUser(job: Job<User>) {
    const selfPermission = await this.permissionService.findByNameAndPrivilege(
      PermissionNames.UserSelf,
      Privilege.Read,
    );
    const projectCreatePermission = await this.permissionService.findByNameAndPrivilege(
      PermissionNames.ProjectManage,
      Privilege.Create,
    );
    job.data.permissions.push(selfPermission, projectCreatePermission);
    return await this.userService.create(job.data);
  }

  @Process(UserJob.UpdateUserPermission)
  async updateUserPermission(job: Job<{ userId: string; permissionId: string }>) {
    await this.userService.updateBy(job.data.userId, {
      $addToSet: { permissions: Types.ObjectId(job.data.permissionId) },
    });
  }
}
