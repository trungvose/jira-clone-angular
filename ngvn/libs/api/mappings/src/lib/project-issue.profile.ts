import {
  ProjectIssueDetailDto,
  ProjectIssueDto,
  ProjectIssueTagDto,
  TimelineAssignDto,
  TimelineCommentDto,
  TimelineMentionDto,
  TimelineTagDto,
  UserDto,
} from '@ngvn/api/dtos';
import {
  ProjectIssue,
  ProjectIssueTag,
  TimelineAssign,
  TimelineComment,
  TimelineMention,
  TimelineTag,
} from '@ngvn/api/project';
import { User } from '@ngvn/api/user';
import { ProjectTimelineType } from '@ngvn/shared/project';
import { AutoMapper, ignore, mapWith, Profile, ProfileBase, mapFrom } from 'nestjsx-automapper';

@Profile()
export class ProjectIssueProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(ProjectIssue, ProjectIssueDto)
      .forMember(
        (d) => d.name,
        mapFrom((s) => `${s.type.toUpperCase()} - ${s.ordinalPosition}`),
      )
      .forMember(
        (d) => d.tags,
        mapWith(
          ProjectIssueTagDto,
          (s) => s.tags,
          () => ProjectIssueTag,
        ),
      )
      .forMember(
        (d) => d.main,
        mapWith(
          UserDto,
          (s) => s.assignee || s.reporter,
          () => User,
        ),
      );
    mapper
      .createMap(ProjectIssue, ProjectIssueDetailDto, { includeBase: [ProjectIssue, ProjectIssueDto] })
      .forMember(
        (d) => d.participants,
        mapWith(
          UserDto,
          (s) => s.participants,
          () => User,
        ),
      )
      .forMember((d) => d.timelines, ignore())
      .afterMap((source, destination) => {
        destination.timelines = [];
        for (const timeline of source.timelineItems) {
          let destination, source;
          switch (timeline.type) {
            case ProjectTimelineType.Comment:
              destination = TimelineCommentDto;
              source = TimelineComment;
              break;
            case ProjectTimelineType.Assign:
              destination = TimelineAssignDto;
              source = TimelineAssign;
              break;
            case ProjectTimelineType.Mention:
              destination = TimelineMentionDto;
              source = TimelineMention;
              break;
            case ProjectTimelineType.Tag:
              destination = TimelineTagDto;
              source = TimelineTag;
              break;
          }
          destination.timelines.push(mapper.map(timeline, destination, source));
        }
      });
  }
}
