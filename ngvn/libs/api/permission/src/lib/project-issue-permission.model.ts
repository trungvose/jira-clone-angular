import { PermissionType } from '@ngvn/shared/permission';
import { prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { AutoMap } from 'nestjsx-automapper';
import { Permission } from './permission.model';

export class ProjectIssuePermission extends Permission {
  type = PermissionType.ProjectIssue;
  @prop({ type: Schema.Types.ObjectId })
  @AutoMap(() => Schema.Types.ObjectId)
  projectIssueId: Schema.Types.ObjectId;
}
