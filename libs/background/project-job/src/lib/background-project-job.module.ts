import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { redisConfiguration } from '@ngvn/api/config';
import { ApiProjectModule } from '@ngvn/api/project';
import { projectQueueName, queueProviderFactory } from '@ngvn/background/common';
import { ProjectJobConsumer } from './project-job.consumer';

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      inject: [redisConfiguration.KEY],
      name: projectQueueName,
      useFactory: queueProviderFactory(projectQueueName),
    }),
    ApiProjectModule,
  ],
  providers: [ProjectJobConsumer],
  exports: [BullModule],
})
export class BackgroundProjectJobModule {}
