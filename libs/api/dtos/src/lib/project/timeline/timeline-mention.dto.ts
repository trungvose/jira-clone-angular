import { Field, ObjectType } from '@nestjs/graphql';
import { AutoMap } from 'nestjsx-automapper';
import { ProjectIssueDto } from '../project-issue.dto';
import { TimelineDto } from './timeline.dto';

@ObjectType()
export class TimelineMentionDto extends TimelineDto {
  @Field((returns) => [ProjectIssueDto])
  @AutoMap(() => ProjectIssueDto)
  issues: ProjectIssueDto[];
}
