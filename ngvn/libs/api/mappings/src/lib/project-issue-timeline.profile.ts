import {
  ProjectIssueDto,
  ProjectIssueTagDto,
  TimelineAssignDto,
  TimelineCommentDto,
  TimelineDto,
  TimelineMentionDto,
  TimelineTagDto,
  UserDto,
} from '@ngvn/api/dtos';
import { Timeline, TimelineAssign, TimelineComment, TimelineMention, TimelineTag } from '@ngvn/api/project';
import { Profile, ProfileBase, AutoMapper, mapWith } from 'nestjsx-automapper';

@Profile()
export class ProjectIssueTimelineProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Timeline, TimelineDto).forMember(
      (d) => d.actor,
      mapWith(UserDto, (s) => s.actor),
    );
    mapper.createMap(TimelineAssign, TimelineAssignDto, { includeBase: [Timeline, TimelineDto] }).forMember(
      (d) => d.assignees,
      mapWith(UserDto, (s) => s.assignees),
    );
    mapper.createMap(TimelineComment, TimelineCommentDto, { includeBase: [Timeline, TimelineDto] });
    mapper.createMap(TimelineMention, TimelineMentionDto, { includeBase: [Timeline, TimelineDto] }).forMember(
      (d) => d.issues,
      mapWith(ProjectIssueDto, (s) => s.issues),
    );
    mapper.createMap(TimelineTag, TimelineTagDto, { includeBase: [Timeline, TimelineDto] }).forMember(
      (d) => d.tags,
      mapWith(ProjectIssueTagDto, (s) => s.tags),
    );
  }
}
