import { BaseModel, useMongoosePlugin } from '@ngvn/api/common';
import { User } from '@ngvn/api/user';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';

@useMongoosePlugin()
export class Team extends BaseModel {
  @prop({ required: true, minlength: 1, index: true, unique: true })
  @AutoMap()
  title: string;
  @prop()
  @AutoMap()
  description?: string;
  @prop({ ref: () => User, autopopulate: true, default: [] })
  @AutoMap(() => User)
  members: Ref<User>[];
  @prop({ default: [] })
  projects: any;
}
