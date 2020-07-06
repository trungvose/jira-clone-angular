import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class MoveIssueParamsDto {
  @Field()
  projectId: string;
  @Field()
  issueId: string;
  @Field()
  targetLaneId: string;
  @Field()
  previousLaneId: string;
  @Field(() => Int)
  targetIndex: number;
  @Field(() => Int)
  previousIndex: number;
}
