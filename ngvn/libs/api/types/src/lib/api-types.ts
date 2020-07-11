import { ConfigType } from '@nestjs/config';
import { BaseModel } from '@ngvn/api/common';
import {
  appConfiguration,
  arenaConfiguration,
  authConfiguration,
  dbConfiguration,
  redisConfiguration,
} from '@ngvn/api/config';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';

export type ModelType<T extends BaseModel> = ReturnModelType<AnyParamConstructor<T>>;

export type AuthConfig = ConfigType<typeof authConfiguration>;
export type DbConfig = ConfigType<typeof dbConfiguration>;
export type AppConfig = ConfigType<typeof appConfiguration>;
export type RedisConfig = ConfigType<typeof redisConfiguration>;
export type ArenaConfig = ConfigType<typeof arenaConfiguration>;
