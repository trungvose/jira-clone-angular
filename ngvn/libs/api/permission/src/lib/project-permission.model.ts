import { PermissionType } from '@ngvn/shared/permission';
import { prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { AutoMap } from 'nestjsx-automapper';
import { Permission } from './permission.model';

export class ProjectPermission extends Permission {
  type = PermissionType.Project;
  @prop({ type: Schema.Types.ObjectId })
  @AutoMap(() => Schema.Types.ObjectId)
  projectId: Schema.Types.ObjectId;
}
