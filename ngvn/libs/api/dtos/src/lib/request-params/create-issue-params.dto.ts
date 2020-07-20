import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ProjectIssuePriority, ProjectIssueType } from '@ngvn/shared/project';
import { AutoMap } from 'nestjsx-automapper';

@InputType()
export class CreateUpdateTagParamsDto {
  @Field()
  @AutoMap()
  text: string;
  @Field({ nullable: true })
  @AutoMap()
  description?: string;
  @Field({ nullable: true })
  @AutoMap()
  textColor?: string;
  @Field({ nullable: true })
  @AutoMap()
  backgroundColor?: string;
}

@ArgsType()
export class CreateIssueParamsDto {
  @Field()
  projectId: string;
  @Field()
  @AutoMap()
  title: string;
  @Field()
  @AutoMap()
  bodyMarkdown: string;
  @Field()
  @AutoMap()
  summary: string;
  @Field(() => ProjectIssueType)
  @AutoMap()
  type: ProjectIssueType;
  @Field(() => CreateUpdateTagParamsDto, { nullable: true })
  @AutoMap(() => CreateUpdateTagParamsDto)
  tags?: CreateUpdateTagParamsDto;
  @Field(() => ProjectIssuePriority, { nullable: true })
  @AutoMap()
  priority?: ProjectIssuePriority;
  @Field({ nullable: true })
  @AutoMap()
  assigneeId?: string;
}
