import * as functions from 'firebase-functions';
import { Config } from './config';
import { initDb } from './db';

const envConfig = functions.config().env as Config;

initDb(envConfig.mongo).catch((err) => {
  throw new Error(err);
});

export const onUserCreated = functions.auth.user().onCreate((user) => {
  console.log('user', JSON.stringify(user));
});
