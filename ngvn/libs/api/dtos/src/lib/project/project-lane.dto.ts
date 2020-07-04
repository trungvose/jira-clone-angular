import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { ProjectIssueDto } from './project-issue.dto';
import { AutoMap } from 'nestjsx-automapper';

@ObjectType()
export class ProjectLaneDto extends BaseDto {
  @Field()
  @AutoMap()
  title: string;
  @Field((returns) => [ProjectIssueDto], { nullable: 'items' })
  @AutoMap(() => ProjectIssueDto)
  issues: ProjectIssueDto[];
}
