import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PermissionType } from '@ngvn/shared/permission';
import { AutoMap } from 'nestjsx-automapper';

@ObjectType()
export class PermissionDto {
  @Field()
  @AutoMap()
  readonly name: string;
  @Field(() => Int)
  @AutoMap()
  readonly score: number;
  @Field(() => PermissionType)
  @AutoMap()
  readonly type: PermissionType;
  @Field(() => [String], { nullable: true })
  teams: string[];
  @Field(() => [String], { nullable: true })
  projects: string[];
}
