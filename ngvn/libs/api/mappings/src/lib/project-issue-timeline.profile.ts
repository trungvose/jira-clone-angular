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
import {
  ProjectIssue,
  ProjectIssueTag,
  Timeline,
  TimelineAssign,
  TimelineComment,
  TimelineMention,
  TimelineTag,
} from '@ngvn/api/project';
import { User } from '@ngvn/shared/user';
import { AutoMapper, mapWith, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class ProjectIssueTimelineProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Timeline, TimelineDto).forMember(
      (d) => d.actor,
      mapWith(
        UserDto,
        (s) => s.actor,
        () => User,
      ),
    );
    mapper.createMap(TimelineAssign, TimelineAssignDto, { includeBase: [Timeline, TimelineDto] }).forMember(
      (d) => d.assignee,
      mapWith(
        UserDto,
        (s) => s.assignee,
        () => User,
      ),
    );
    mapper.createMap(TimelineComment, TimelineCommentDto, { includeBase: [Timeline, TimelineDto] });
    mapper.createMap(TimelineMention, TimelineMentionDto, { includeBase: [Timeline, TimelineDto] }).forMember(
      (d) => d.issues,
      mapWith(
        ProjectIssueDto,
        (s) => s.issues,
        () => ProjectIssue,
      ),
    );
    mapper.createMap(TimelineTag, TimelineTagDto, { includeBase: [Timeline, TimelineDto] }).forMember(
      (d) => d.tags,
      mapWith(
        ProjectIssueTagDto,
        (s) => s.tags,
        () => ProjectIssueTag,
      ),
    );
  }
}
