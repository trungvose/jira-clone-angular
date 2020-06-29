import { BaseModel, useMongoosePlugin } from '@ngvn/api/common';
import { Role } from '@ngvn/api/role';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { v4 as uuid } from 'uuid';

@useMongoosePlugin()
export class User extends BaseModel {
  @prop({
    required: true,
    unique: true,
    trim: true,
    minlength: 8,
    maxlength: 100,
    index: true,
  })
  @AutoMap()
  email: string;
  @prop({ required: true, minlength: 1, maxlength: 100, index: true })
  @AutoMap()
  firstName: string;
  @prop({ required: true, minlength: 1, maxlength: 100, index: true })
  @AutoMap()
  lastName: string;
  @prop({ required: true, minlength: 6 })
  password: string;
  @prop({ default: uuid() })
  refreshTokenId: string;
  @prop({ default: null })
  verify: Date;
  @prop({ ref: Role, autopopulate: true, default: null })
  @AutoMap(() => Role)
  role: Ref<Role>;
}
