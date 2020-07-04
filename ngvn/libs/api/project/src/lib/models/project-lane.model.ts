import { BaseModel, useMongoosePlugin } from '@ngvn/api/common';
import { prop, Ref } from '@typegoose/typegoose';
import { ProjectIssue } from './project-issue.model';
import { ProjectLaneCondition } from './project-lane-condition.model';
import { AutoMap } from 'nestjsx-automapper';

@useMongoosePlugin()
export class ProjectLane extends BaseModel {
  @prop({ required: true, index: true })
  @AutoMap()
  title: string;
  @prop({ type: () => ProjectLaneCondition, default: [] })
  conditions: ProjectLaneCondition[];
  @prop({ ref: () => ProjectIssue, autopopulate: true, default: [] })
  @AutoMap(() => ProjectIssue)
  issues: Ref<ProjectIssue>[];
}
