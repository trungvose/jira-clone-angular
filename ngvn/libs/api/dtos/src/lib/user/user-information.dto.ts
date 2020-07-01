import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from '@ngvn/api/common';
import { AutoMap } from 'nestjsx-automapper';
import { PermissionDto } from '../auth';

@ObjectType()
export class UserInformationDto extends BaseDto {
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
  @Field(() => [PermissionDto])
  permissions: PermissionDto[];
}
