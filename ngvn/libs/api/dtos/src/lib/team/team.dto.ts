import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { AutoMap } from 'nestjsx-automapper';
import { UserDto } from '../user';

@ObjectType()
export class TeamDto extends BaseDto {
  @Field()
  @AutoMap()
  title: string;
  @Field({ nullable: true })
  @AutoMap()
  description?: string;
  @Field((returns) => [UserDto])
  @AutoMap(() => UserDto)
  members: UserDto[];
}
