import { PermissionType } from '@ngvn/shared/permission';
import { prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { AutoMap } from 'nestjsx-automapper';
import { Permission } from './permission.model';

export class TeamPermission extends Permission {
  type = PermissionType.Team;
  @prop({ type: Schema.Types.ObjectId })
  @AutoMap(() => Schema.Types.ObjectId)
  teamId: Schema.Types.ObjectId;
}
