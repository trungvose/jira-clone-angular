import { BaseModel, useMongoosePlugin } from '@ngvn/api/common';
import { PermissionType, Privilege } from '@ngvn/shared/permission';
import { modelOptions, prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';

@useMongoosePlugin()
@modelOptions({
  schemaOptions: {
    discriminatorKey: 'type',
  },
})
export class Permission extends BaseModel {
  @prop({ required: true, index: true, text: true })
  @AutoMap()
  permissionName: string;
  @prop({
    required: true,
    min: 0,
    max: Privilege.Read | Privilege.Create | Privilege.Update | Privilege.Delete,
  })
  @AutoMap()
  privilege: number;
  @prop({ required: true, index: true, enum: PermissionType, default: PermissionType.System, type: String })
  @AutoMap()
  type: PermissionType;
}
