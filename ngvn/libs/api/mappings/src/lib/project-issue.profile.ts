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
import { ProjectIssue, TimelineAssign, TimelineComment, TimelineMention, TimelineTag } from '@ngvn/api/project';
import { ProjectTimelineType } from '@ngvn/shared/project';
import { AutoMapper, ignore, mapWith, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class ProjectIssueProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(ProjectIssue, ProjectIssueDto)
      .forMember(
        (d) => d.tags,
        mapWith(ProjectIssueTagDto, (s) => s.tags),
      )
      .forMember(
        (d) => d.participants,
        mapWith(UserDto, (s) => s.participants),
      );
    mapper
      .createMap(ProjectIssue, ProjectIssueDetailDto, { includeBase: [ProjectIssue, ProjectIssueDto] })
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
        console.log('afterMap', destination);
      });
  }
}
