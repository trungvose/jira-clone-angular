import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { ProjectIssuePriority, ProjectIssueStatus, ProjectIssueType } from '@ngvn/shared/project';
import { AutoMap } from 'nestjsx-automapper';
import { CreateUpdateTagParamsDto } from './create-issue-params.dto';

@InputType()
export class UpdateIssueDetailDto extends BaseDto {
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
  @Field((returns) => [CreateUpdateTagParamsDto], { nullable: 'items' })
  @AutoMap(() => CreateUpdateTagParamsDto)
  tags: CreateUpdateTagParamsDto[];
}

@ArgsType()
export class UpdateIssueParamsDto {
  @Field()
  projectId: string;
  @Field(() => UpdateIssueDetailDto)
  issue: UpdateIssueDetailDto;
}
