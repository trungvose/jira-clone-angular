import { ProjectTimelineType } from '@ngvn/shared/project';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { ProjectIssue } from './project-issue.model';
import { Timeline } from './timeline.model';

export class TimelineMention extends Timeline {
  type = ProjectTimelineType.Mention;
  @prop({ ref: () => ProjectIssue, autopopulate: true, default: [] })
  @AutoMap(() => ProjectIssue)
  issues: Ref<ProjectIssue>[];
}
