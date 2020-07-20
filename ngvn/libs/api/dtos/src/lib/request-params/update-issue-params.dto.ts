import { ArgsType, Field } from '@nestjs/graphql';
import { ProjectIssueDetailDto } from '../project/project-issue-detail.dto';

@ArgsType()
export class UpdateIssueParamsDto {
  @Field()
  projectId: string;
  @Field(() => ProjectIssueDetailDto)
  issue: ProjectIssueDetailDto;
}
