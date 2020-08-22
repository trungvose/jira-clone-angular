import { prop, Ref } from '@typegoose/typegoose';
import { ProjectIssueTag } from './project-issue-tag.model';
import { Timeline } from './timeline.model';

export class TimelineTag extends Timeline {
  @prop()
  action: string;
  @prop({ ref: () => ProjectIssueTag, autopopulate: true, default: [] })
  tags: Ref<ProjectIssueTag>[];
}
