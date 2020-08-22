import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class MoveIssueParamsDto {
  @Field()
  projectId: string;
  @Field()
  targetLaneId: string;
  @Field()
  previousLaneId: string;
  @Field(() => [String])
  targetIssues: string[];
  @Field(() => [String])
  previousIssues: string[];
}
