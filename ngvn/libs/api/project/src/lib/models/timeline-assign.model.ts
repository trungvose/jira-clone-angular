import { User } from '@ngvn/api/user';
import { ProjectTimelineType } from '@ngvn/shared/project';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { Timeline } from './timeline.model';

export class TimelineAssign extends Timeline {
  type = ProjectTimelineType.Assign;
  @prop({ ref: () => User, autopopulate: true, default: [] })
  @AutoMap(() => User)
  assignee: Ref<User>[];
}
