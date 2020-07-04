import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { ProjectIssuePriority, ProjectIssueStatus, ProjectIssueType } from '@ngvn/shared/project';
import { AutoMap } from 'nestjsx-automapper';
import { UserDto } from '../user';
import { ProjectIssueTagDto } from './project-issue-tag.dto';

@ObjectType()
export class ProjectIssueDto extends BaseDto {
  @Field()
  @AutoMap()
  name: string;
  @Field()
  @AutoMap()
  title: string;
  @Field()
  @AutoMap()
  summary: string;
  @Field((returns) => ProjectIssueType)
  @AutoMap()
  type: ProjectIssueType;
  @Field((returns) => ProjectIssueStatus)
  @AutoMap()
  status: ProjectIssueStatus;
  @Field((returns) => ProjectIssuePriority)
  @AutoMap()
  priority: ProjectIssuePriority;
  @Field((returns) => [ProjectIssueTagDto], { nullable: 'items' })
  @AutoMap(() => ProjectIssueTagDto)
  tags: ProjectIssueTagDto[];
  @Field((returns) => UserDto)
  @AutoMap(() => UserDto)
  main: UserDto;
}
