import { Process, Processor } from '@nestjs/bull';
import { User, UserService } from '@ngvn/api/user';
import { UserJob, userQueueName } from '@ngvn/background/common';
import { Job } from 'bull';

@Processor(userQueueName)
export class UserJobConsumer {
  constructor(private readonly userService: UserService) {}

  @Process(UserJob.AddUser)
  async addUser(job: Job<User>) {
    return await this.userService.create(job.data);
  }
}
