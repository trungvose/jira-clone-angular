import { User } from '@ngvn/shared/user';
import { parseFullName } from '@ngvn/shared/utils';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { Config } from './config';
import { initUserQueue } from './queue';

export async function createOrUpdate(
  userModel: ReturnModelType<AnyParamConstructor<User>>,
  record: UserRecord,
  redisConfig: Config['redis'],
) {
  const {
    uid,
    email,
    displayName,
    photoURL,
    providerData: [{ providerId, uid: providerUid }],
  } = record;
  const [firstName, lastName] = parseFullName(displayName);

  const exist = await userModel
    .findOne({
      oauthId: uid,
      provider: providerId,
      providerUid,
    })
    .lean()
    .exec();

  if (exist) {
    exist.firstName = firstName;
    exist.lastName = lastName;
    exist.avatarUrl = photoURL;
    return await userModel.findByIdAndUpdate(exist._id, exist, { new: true }).lean().exec();
  }

  const newUser = new userModel({
    email,
    firstName,
    lastName,
    avatarUrl: photoURL,
    oauthId: uid,
    provider: providerId,
    providerUid,
    password: 'noPassword',
  });
  const userQueue = initUserQueue(redisConfig);
  await userQueue.add('addUserFromOauth', newUser);
}
