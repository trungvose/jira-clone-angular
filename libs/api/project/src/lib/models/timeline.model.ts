import { BaseModel, useMongoosePlugin } from '@ngvn/api/common';
import { ProjectTimelineType } from '@ngvn/shared/project';
import { User } from '@ngvn/shared/user';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';

@useMongoosePlugin()
@modelOptions({
  schemaOptions: {
    discriminatorKey: 'type',
  },
})
export class Timeline extends BaseModel {
  @prop({ required: true, index: true, enum: ProjectTimelineType, type: String })
  type: ProjectTimelineType;
  @prop({ required: true, ref: () => User })
  actor: Ref<User>;
}
