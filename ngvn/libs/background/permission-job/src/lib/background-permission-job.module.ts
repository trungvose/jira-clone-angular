import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { redisConfiguration } from '@ngvn/api/config';
import { ApiPermissionModule } from '@ngvn/api/permission';
import { ApiProjectModule } from '@ngvn/api/project';
import { permissionQueueName, queueProviderFactory } from '@ngvn/background/common';
import { PermissionJobConsumer } from './permission-job.consumer';

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      inject: [redisConfiguration.KEY],
      name: permissionQueueName,
      useFactory: queueProviderFactory(permissionQueueName),
    }),
    ApiPermissionModule,
    ApiProjectModule,
  ],
  providers: [PermissionJobConsumer],
  exports: [BullModule],
})
export class BackgroundPermissionJobModule {}
