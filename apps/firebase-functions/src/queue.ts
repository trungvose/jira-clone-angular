import { userQueueName } from '@ngvn/background/common';
import Queue from 'bull';
import { Config } from './config';

const defaultJobOptions = {
  attempts: 5,
  timeout: 10000,
};

function getQueueRedisConfig(redisConfig: Config['redis']) {
  const config = { host: redisConfig.host, port: Number(redisConfig.port) };
  if (redisConfig.password) {
    config['password'] = redisConfig.password;
  }
  return config;
}

let userQueue: Queue.Queue;
export const initUserQueue = (redisConfig: Config['redis']) => {
  if (!userQueue) {
    userQueue = new Queue(userQueueName, {
      redis: getQueueRedisConfig(redisConfig),
      defaultJobOptions,
    });
  }

  return userQueue;
};
