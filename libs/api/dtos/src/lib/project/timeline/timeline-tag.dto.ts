import { Field, ObjectType } from '@nestjs/graphql';
import { AutoMap } from 'nestjsx-automapper';
import { ProjectIssueTagDto } from '../project-issue-tag.dto';
import { TimelineDto } from './timeline.dto';

@ObjectType()
export class TimelineTagDto extends TimelineDto {
  @Field((returns) => [ProjectIssueTagDto])
  @AutoMap(() => ProjectIssueTagDto)
  tags: ProjectIssueTagDto[];
}
