import { BaseModel, useMongoosePlugin } from '@ngvn/api/common';
import { prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';

@useMongoosePlugin()
export class ProjectIssueTag extends BaseModel {
  @prop({ required: true, minlength: 1, index: true })
  @AutoMap()
  text: string;
  @prop({ required: true, default: '#ECF4FC' })
  @AutoMap()
  backgroundColor: string;
  @prop({ required: true, default: '#6A6E72' })
  @AutoMap()
  textColor: string;
  @prop({ default: '' })
  @AutoMap()
  description?: string;
}
