import { ProjectTimelineType } from '@ngvn/shared/project';
import { User } from '@ngvn/shared/user';
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { Timeline } from './timeline.model';

export class TimelineAssign extends Timeline {
  type = ProjectTimelineType.Assign;
  @prop({ ref: () => User, autopopulate: true, required: true })
  @AutoMap(() => User)
  assignee: Ref<User>;
}
