import { ProjectTimelineType } from '@ngvn/shared/project';
import { prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { Timeline } from './timeline.model';

export class TimelineComment extends Timeline {
  type = ProjectTimelineType.Comment;
  @prop({ required: true })
  @AutoMap()
  markdownBody: string;
  @prop({ default: '' })
  @AutoMap()
  outputHtml: string;
}
