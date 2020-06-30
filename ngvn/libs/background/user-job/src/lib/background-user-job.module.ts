import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { redisConfiguration } from '@ngvn/api/config';
import { ApiUserModule } from '@ngvn/api/user';
import { queueProviderFactory, userQueueName } from '@ngvn/background/common';
import { UserJobConsumer } from './user-job.consumer';

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      inject: [redisConfiguration.KEY],
      name: userQueueName,
      useFactory: queueProviderFactory(userQueueName),
    }),
    ApiUserModule,
  ],
  providers: [UserJobConsumer],
  exports: [BullModule],
})
export class BackgroundUserJobModule {}
