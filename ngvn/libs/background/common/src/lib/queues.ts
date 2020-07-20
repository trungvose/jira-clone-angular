import { BullModuleOptions } from '@nestjs/bull';
import { RedisConfig } from '@ngvn/api/types';

export const queueDefaultOptions = {
  defaultJobOptions: {
    attempts: 5,
    timeout: 10000,
  },
};

export const queueProviderFactory = (name: string) => (redisConfig: RedisConfig): BullModuleOptions => ({
  name,
  redis: {
    host: redisConfig.host,
    port: Number(redisConfig.port),
  },
  defaultJobOptions: queueDefaultOptions.defaultJobOptions,
});

export const userQueueName = 'userQueue';
export const projectIssueQueueName = 'projectIssueQueue';
export const projectQueueName = 'projectQueue';

export const queueNames = [userQueueName, projectIssueQueueName, projectQueueName];
