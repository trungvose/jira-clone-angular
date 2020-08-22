import {
  CreateIssueParamsDto,
  CreateUpdateTagParamsDto,
  ProjectIssueDetailDto,
  ProjectIssueDto,
  ProjectIssueTagDto,
  TimelineAssignDto,
  TimelineCommentDto,
  TimelineMentionDto,
  TimelineTagDto,
  UpdateIssueDetailDto,
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
import { ProjectTimelineType } from '@ngvn/shared/project';
import { User } from '@ngvn/shared/user';
import { Types } from 'mongoose';
import {
  AutoMapper,
  fromValue,
  ignore,
  mapFrom,
  mapWith,
  preCondition,
  Profile,
  ProfileBase,
} from 'nestjsx-automapper';
import { ignoreBaseProperties } from './utils/ignore-base-properties.util';

@Profile()
export class ProjectIssueProfile extends ProfileBase {
  constructor(private mapper: AutoMapper) {
    super();
    mapper
      .createMap(ProjectIssue, ProjectIssueDto)
      .forMember(
        (d) => d.name,
        mapFrom((s) => `${ s.type.toUpperCase() } - ${ s.ordinalPosition }`),
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
      .afterMap(this.timelineItemsAfterMap.bind(this));

    mapper
      .createMap(UpdateIssueDetailDto, ProjectIssue)
      .forMember((d) => d.ordinalPosition, ignore())
      .forMember((d) => d.participants, ignore())
      .forMember((d) => d.reporter, ignore())
      .forMember((d) => d.assignee, ignore())
      .forMember((d) => d.timelineItems, ignore())
      .forMember((d) => d.bodyMarkdown, ignore());

    ignoreBaseProperties(
      mapper
        .createMap(CreateIssueParamsDto, ProjectIssue)
        .forMember((d) => d.reporter, ignore())
        .forMember((d) => d.ordinalPosition, ignore())
        .forMember((d) => d.timelineItems, ignore())
        .forMember(
          (d) => d.assignee,
          preCondition((s) => s.assigneeId != null),
          mapFrom((s) => Types.ObjectId(s.assigneeId)),
        )
        .forMember(
          (d) => d.tags,
          mapWith(
            ProjectIssueTag,
            (s) => s.tags,
            () => CreateUpdateTagParamsDto,
          ),
        )
        .forMember((d) => d.outputHtml, ignore())
        .forMember((d) => d.participants, fromValue([]))
        .forMember((d) => d.status, ignore()),
    );
  }

  private timelineItemsAfterMap(source: ProjectIssue, destination: ProjectIssueDetailDto) {
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
      destination.timelines.push(this.mapper.map(timeline, destination, source));
    }
  }
}
