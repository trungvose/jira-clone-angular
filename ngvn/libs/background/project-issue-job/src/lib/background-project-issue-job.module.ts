import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { redisConfiguration } from '@ngvn/api/config';
import { ApiProjectIssueModule } from '@ngvn/api/project';
import { projectIssueQueueName, queueProviderFactory } from '@ngvn/background/common';
import { ProjectIssueJobConsumer } from './project-issue-job.consumer';

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      inject: [redisConfiguration.KEY],
      name: projectIssueQueueName,
      useFactory: queueProviderFactory(projectIssueQueueName),
    }),
    ApiProjectIssueModule,
  ],
  providers: [ProjectIssueJobConsumer],
  exports: [BullModule],
})
export class BackgroundProjectIssueJobModule {}
