import { Permission } from '@ngvn/api/permission';
import { PermissionNames, Privilege } from '@ngvn/shared/permission';
import { User } from '@ngvn/shared/user';
import { getModelForClass } from '@typegoose/typegoose';
import { Job } from 'bull';
import * as functions from 'firebase-functions';
import { Config } from './config';
import { initDb } from './db';
import { initUserQueue } from './queue';
import { createOrUpdate } from './utils';

const envConfig = functions.config().env as Config;

initDb(envConfig.mongo).catch((err) => {
  throw new Error(err);
});

const userQueue = initUserQueue(envConfig.redis);

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  try {
    const userModel = getModelForClass(User);
    const permissionModel = getModelForClass(Permission);

    await createOrUpdate(userModel, user, envConfig.redis);
    userQueue
      .process('addUserFromOauth', async (job: Job<User>) => {
        console.log('processing with jobData:', JSON.stringify(job.data));
        const permissions = await Promise.all([
          permissionModel.findOne({ permissionName: PermissionNames.UserSelf, privilege: Privilege.Read }).exec(),
          permissionModel
            .findOne({ permissionName: PermissionNames.ProjectManage, privilege: Privilege.Create })
            .exec(),
        ]);
        if (permissions.every(Boolean)) {
          job.data.permissions.push(...permissions);
        }
        await userModel.create(job.data);
      })
      .then(() => {
        console.log('addUserFromOauth finished');
      });
  } catch (e) {
    console.log(JSON.stringify(e));
  }
});
