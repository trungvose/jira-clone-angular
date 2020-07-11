import { createUnionType } from '@nestjs/graphql';
import { ProjectTimelineType } from '@ngvn/shared/project';
import { TimelineDto } from './timeline.dto';
import { TimelineAssignDto } from './timeline-assign.dto';
import { TimelineCommentDto } from './timeline-comment.dto';
import { TimelineMentionDto } from './timeline-mention.dto';
import { TimelineTagDto } from './timeline-tag.dto';

export const TimelineUnionDto = createUnionType({
  name: 'TimelineDto',
  types: () => [TimelineAssignDto, TimelineCommentDto, TimelineTagDto, TimelineMentionDto],
  resolveType(value: TimelineDto) {
    switch (value.type) {
      case ProjectTimelineType.Comment:
        return TimelineCommentDto;
      case ProjectTimelineType.Assign:
        return TimelineAssignDto;
      case ProjectTimelineType.Mention:
        return TimelineMentionDto;
      case ProjectTimelineType.Tag:
        return TimelineTagDto;
    }
  },
});
