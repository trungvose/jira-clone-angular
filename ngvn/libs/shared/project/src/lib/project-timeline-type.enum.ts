import { registerEnumType } from '@nestjs/graphql';

export enum ProjectTimelineType {
  Comment = 'Comment',
  Assign = 'Assign',
  Mention = 'Mention',
  Tag = 'Tag',
}

registerEnumType(ProjectTimelineType, { name: 'ProjectTimelineType' });
