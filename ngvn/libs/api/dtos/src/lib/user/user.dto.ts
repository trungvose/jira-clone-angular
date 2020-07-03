import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { AutoMap } from 'nestjsx-automapper';

@ObjectType()
export class UserDto extends BaseDto {
  @Field()
  @AutoMap()
  email: string;
  @Field()
  @AutoMap()
  firstName: string;
  @Field()
  @AutoMap()
  lastName: string;
  @Field()
  @AutoMap()
  fullName: string;
  @Field((returns) => String, { nullable: true })
  @AutoMap()
  avatarUrl: string;
}
