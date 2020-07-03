import { BaseModel, useMongoosePlugin } from '@ngvn/api/common';
import { Team } from '@ngvn/api/team';
import { User } from '@ngvn/api/user';
import { ProjectCategory } from '@ngvn/shared/project';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { ProjectIssue } from './project-issue.model';

@useMongoosePlugin()
export class Project extends BaseModel {
  @prop({ required: true, index: true, unique: true })
  @AutoMap()
  name: string;
  @prop({ required: true, index: true })
  @AutoMap()
  slug: string;
  @prop()
  @AutoMap()
  description?: string;
  @prop({ required: true, enum: ProjectCategory, type: String })
  @AutoMap()
  category: ProjectCategory;
  @prop({ autopopulate: true, ref: () => User, default: [] })
  @AutoMap(() => User)
  users: Ref<User>[];
  @prop({ autopopulate: true, ref: () => Team, default: [] })
  @AutoMap(() => Team)
  teams: Ref<Team>[];
  @prop({ autopopulate: true, ref: () => ProjectIssue, default: [] })
  @AutoMap(() => ProjectIssue)
  issues: Ref<ProjectIssue>[];
}
