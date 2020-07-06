import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ReorderIssueParamsDto {
  @Field()
  projectId: string;
  @Field()
  laneId: string;
  @Field(() => [String])
  issues: string[];
}
