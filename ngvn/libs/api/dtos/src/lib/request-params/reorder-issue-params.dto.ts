import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ReorderIssueParamsDto {
  @Field()
  projectId: string;
  @Field()
  laneId: string;
  @Field()
  issueId: string;
  @Field(() => Int)
  targetIndex: number;
  @Field(() => Int)
  previousIndex: number;
}
